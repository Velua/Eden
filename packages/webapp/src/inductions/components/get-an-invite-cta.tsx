import React from "react";
import { ActionButton, ActionButtonSize } from "_app";
import {
    InductionJourneyContainer,
    InductionRole,
} from "./induction-journey-container";

export const GetAnInviteCTA = () => {
    return (
        <InductionJourneyContainer role={InductionRole.INVITEE} step={1}>
            <>
                <p className="mb-10 text-2xl font-medium title-font text-gray-900 dark:text-gray-300">
                    Ready to join Eden? The membership process begins with an
                    invitation. Reach out to a current member to get yours!
                    We'll guide you through the rest.
                </p>
                <ActionButton
                    href="https://www.notion.so/edenos/Getting-an-Invite-2d38947d5be94dcb84dfa1ae48894802"
                    size={ActionButtonSize.L}
                >
                    Learn more
                </ActionButton>
            </>
        </InductionJourneyContainer>
    );
};
