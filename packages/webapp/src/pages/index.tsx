import { CallToAction, Card, Heading, Link, RawLayout, Text } from "_app";
import {
    GlobeAltIcon,
    ScaleIcon,
    SunIcon,
    HomeIcon,
} from "@heroicons/react/outline";

const features = [
    {
        name: "Peace Treaty",
        description:
            "All members of Eden agree to a non-violent peace treaty in pursuit of Life, Librety, Property and Justice.",
        icon: SunIcon,
    },
    {
        name: "Fractal Elections",
        description:
            "In each election all community members are placed into random groups of 4-12. Each group must elect an member to represent them with a 2/3+1 consensus. This process is recycled until the last round.",
        icon: GlobeAltIcon,
    },
    {
        name: "Randomness",
        description:
            "Eden recognises the power of randomness to ensure anti-fragility by electing two runner ups from the final round at random.",
        icon: ScaleIcon,
    },
    {
        name: "Invite only",
        description:
            "Each community member requires an invite from 3 existing members.",
        icon: HomeIcon,
    },
];

const Example = () => {
    return (
        <div className="py-12 bg-white dark:bg-gray-600 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">
                        EDEN
                    </h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight dark:text-gray-300 text-gray-900 sm:text-4xl">
                        Reapproaching Blockchain Governance
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
                        Do you feel like your vote really counts?
                    </p>
                </div>

                <div className="mt-10">
                    <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative">
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                        <feature.icon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-gray-300">
                                        {feature.name}
                                    </p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                                    {feature.description}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
};

export const Index = () => (
    <RawLayout>
        <div className="max-w-6xl mx-auto md:px-6 px-4">
            <div className="md:py-20 py-12">
                <div className="md:pb-20 pb-12 max-w-3xl mx-auto text-center ">
                    <h2 className="md:text-6xl text-4xl text-black dark:text-white font-bold mb-4">
                        A new approach to Governance
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Eden is a community working to maximize the power and
                        independence of its members, thereby securing Life,
                        Liberty, Property, and Justice for all.
                    </p>
                </div>
            </div>
        </div>
        <Card>
            <div className="grid grid-cols-2 gap-4 md:gap-16 lg:gap-24 lg:px-24 xl:px-56 text-gray-800">
                <div className="col-span-2 md:col-span-1 space-y-4">
                    <Heading size={2}>Welcome to Eden</Heading>
                    <Text>
                        A team of people can be more powerful than the sum of
                        its members, but all teams need a means to reach
                        consensus, or they will fall apart. Unfortunately,
                        traditional democratic processes end up empowering
                        politicians and disempowering the people who
                        participate.
                    </Text>
                </div>
                <div className="col-span-2 md:col-span-1 space-y-4">
                    <Text>
                        EdenOS is a revolutionary new democratic process that
                        protects and enhances the independence and power of
                        those who join. When you join the Eden community, you
                        gain access to a group of people working together to
                        empower you and your family to make a bigger impact in
                        the world.
                    </Text>
                    <Text>
                        To learn more about Eden and how you can get involved,
                        visit{" "}
                        <Link
                            href="http://eden.eoscommunity.org"
                            target="_blank"
                            isExternal
                        >
                            eden.eoscommunity.org
                        </Link>
                        .
                    </Text>
                </div>
            </div>
        </Card>
        <Example />
    </RawLayout>
);

export default Index;
