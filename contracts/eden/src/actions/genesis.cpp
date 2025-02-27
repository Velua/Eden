#include <accounts.hpp>
#include <eden-atomicassets.hpp>
#include <eden.hpp>
#include <globals.hpp>
#include <inductions.hpp>
#include <members.hpp>

namespace eden
{
   void eden::clearall()
   {
      require_auth(get_self());
      accounts{get_self()}.clear_all();
      members{get_self()}.clear_all();
      inductions{get_self()}.clear_all();
      get_global_singleton(get_self()).remove();
   }

   void eden::addtogenesis(eosio::name newmember)
   {
      require_auth(get_self());
      members members(get_self());

      eosio::check(globals(get_self()).get().stage == contract_stage::genesis, "Not in genesis");

      std::vector<eosio::name> initial_members;
      member_table_type member_tb(get_self(), default_scope);
      for(const auto& member : member_tb)
      {
         initial_members.push_back(member.account());
      }

      members.create(newmember);

      // for each current induction, add newmember as a witness
      inductions inductions(get_self());

      induction_table_type inductions_tb(get_self(), default_scope);
      eosio::check(inductions_tb.begin() != inductions_tb.end(), "No inductions");
      auto genesis_video = inductions_tb.begin()->video();

      for(const auto& induction: inductions_tb)
      {
         inductions_tb.modify(induction, get_self(), [&](auto& row){ ++row.endorsements(); });
         inductions.create_endorsement(induction.inviter(), induction.invitee(), newmember, induction.id(), true);
      }
      
      uint64_t induction_id = members.stats().active_members + members.stats().pending_members;
      auto inviter = get_self();
      auto invitee = newmember;

      auto total_endorsements = initial_members.size();
      inductions.create_induction(induction_id, inviter, invitee, total_endorsements,
                                  genesis_video);

      for (const auto& endorser : initial_members)
      {
         if (endorser != invitee)
         {
            inductions.create_endorsement(inviter, invitee, endorser, induction_id);
         }
      }
   }
   
   void eden::genesis(std::string community,
                      eosio::symbol community_symbol,
                      eosio::asset minimum_donation,
                      std::vector<eosio::name> initial_members,
                      std::string genesis_video,
                      atomicassets::attribute_map collection_attributes,
                      eosio::asset auction_starting_bid,
                      uint32_t auction_duration,
                      eosio::ignore<std::string> memo)
   {
      require_auth(get_self());

      eosio::check(community_symbol == minimum_donation.symbol,
                   "community symbol does not match minimum donation");

      eosio::check(community_symbol == auction_starting_bid.symbol,
                   "community symbol does not match auction starting bid");

      globals{get_self(),
              {.community = community,
               .minimum_donation = minimum_donation,
               .auction_starting_bid = auction_starting_bid,
               .auction_duration = auction_duration,
               .stage = contract_stage::genesis}};
      members members{get_self()};
      inductions inductions{get_self()};

      auto inviter = get_self();
      auto total_endorsements = initial_members.size() - 1;
      uint64_t induction_id = 1;

      for (const auto& invitee : initial_members)
      {
         members.create(invitee);

         inductions.create_induction(induction_id, inviter, invitee, total_endorsements,
                                     genesis_video);

         for (const auto& endorser : initial_members)
         {
            if (endorser != invitee)
            {
               inductions.create_endorsement(inviter, invitee, endorser, induction_id);
            }
         }

         induction_id++;
      }

      const auto collection_name = get_self();
      atomicassets::init_collection(atomic_assets_account, get_self(), collection_name, schema_name,
                                    initial_market_fee, collection_attributes);
   }

}  // namespace eden
