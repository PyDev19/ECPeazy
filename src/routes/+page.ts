export function load() {
    let features = [
        {
            'title': 'AI Assistant',
            'description': 'Our AI allows you to get recommendations on how you should purse a certain EC and how to excel in it.',
            'image': 'robot.svg'
        },
        {
            'title': 'Custom Portfolio',
            'description': 'Our portfolio system allows you to get personalized recommendations of what ECs you should do.',
            'image': 'portfolio.svg'
        },
        {
            'title': 'Filtered Search',
            'description': 'Our filter based search system allows you to more accurately find ECs to do.',
            'image': 'search.svg'
        }
    ]

    let team = [
        {
            'name': 'Tharun Sevvel',
            'role': 'Co-Founder/AI Developer',
            'image': 'blank-profile.png'
        },
        {
            'name': 'Atharva Mishra',
            'role': 'Co-Founder/Full Stack Developer/AI Developer',
            'image': 'blank-profile.png'
        },
        {
            'name': 'Sai Sasank Achanta',
            'role': 'Co-Founder/Web Designer/Media & Marketing',
            'image': 'blank-profile.png'
        }
    ]

    let socials = [
        {
            'name': 'Instagram',
            'link': 'https://www.instagram.com/ec_peazy_/',
            'image': 'instagram.svg'
        },
        {
            'name': 'Discord',
            'link': 'https://twitter.com/ecpeazy',
            'image': 'discord.svg'
        },
        {
            'name': 'TikTok',
            'link': 'https://www.facebook.com/ecpeazy',
            'image': 'tiktok.svg'
        },
        {
            'name': 'Email',
            'link': 'mailto:',
            'image': 'envelope-at.svg'
        }
    ]

    return {
        features: features,
        team: team,
        socials: socials
    }
}