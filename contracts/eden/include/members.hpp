#pragma once

#include <constants.hpp>
#include <eosio/asset.hpp>
#include <eosio/eosio.hpp>
#include <globals.hpp>
#include <string>
#include <utils.hpp>

namespace eden
{
   using member_status_type = uint8_t;
   enum member_status : member_status_type
   {
      pending_membership = 0,
      active_member = 1
   };

   struct member_v0
   {
      eosio::name account;
      std::string name;
      member_status_type status;
      uint64_t nft_template_id;

      uint64_t primary_key() const { return account.value; }
   };
   EOSIO_REFLECT(member_v0, account, name, status, nft_template_id)

   using member_variant = std::variant<member_v0>;

   struct member
   {
      member() = default;
      member(const member&) = delete;
      member_variant value;
      EDEN_FORWARD_MEMBERS(value, account, name, status, nft_template_id);
      EDEN_FORWARD_FUNCTIONS(value, primary_key)
   };
   EOSIO_REFLECT(member, value)

   using member_table_type = eosio::multi_index<"member"_n, member>;

   struct member_stats_v0
   {
      uint16_t active_members;
      uint16_t pending_members;
      uint16_t completed_waiting_inductions;
   };
   EOSIO_REFLECT(member_stats_v0, active_members, pending_members, completed_waiting_inductions);

   using member_stats_variant = std::variant<member_stats_v0>;
   using member_stats_singleton = eosio::singleton<"memberstats"_n, member_stats_variant>;

   class members
   {
     private:
      eosio::name contract;
      member_table_type member_tb;
      globals globals;
      member_stats_singleton member_stats;

     public:
      members(eosio::name contract)
          : contract(contract),
            member_tb(contract, default_scope),
            globals(contract),
            member_stats(contract, default_scope)
      {
      }

      const member& get_member(eosio::name account);
      const member_table_type& get_table() const { return member_tb; }
      void create(eosio::name account);
      void remove_if_pending(eosio::name account);
      bool is_new_member(eosio::name account) const;
      void check_active_member(eosio::name account);
      void check_pending_member(eosio::name account);
      void deposit(eosio::name account, const eosio::asset& quantity);
      void set_nft(eosio::name account, int32_t nft_template_id);
      void set_active(eosio::name account, const std::string& name);
      // Activates the contract if all genesis members are active
      void maybe_activate_contract();
      member_stats_v0 stats();

      // this method is used only for administrative purposes,
      // it should never be used outside genesis or test environments
      void clear_all();
   };

}  // namespace eden
