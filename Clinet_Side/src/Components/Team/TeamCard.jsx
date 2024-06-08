// Team.js

import TeamMember from './Team';

const TeamCard = () => {
    const teamMembers = [
        {
            name: 'John Doe',
            role: 'Co-founder & CEO',
            imageUrl: 'https://via.placeholder.com/150',
            twitterUrl: '#',
            linkedinUrl: '#',
            githubUrl: '#'
        },
        // Add more team members as needed
    ];

    return (
        <div className="container mx-auto py-12">
            <h1 className="text-3xl font-bold text-center mb-8">Our Team</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                    <TeamMember key={index} {...member} />
                ))}
            </div>
        </div>
    );
};

export default TeamCard;
