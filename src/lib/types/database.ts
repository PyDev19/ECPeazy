export type EC = {
    name: string,
    time_commitment: string,
    website: string,
    team_individual: string,
    subjects: string[],
    skill_levels: string[],
    org_types: string[],
    locations: string[],
    image: string,
    grades: string[],
    description: string,
    categories: string
}

export type Portfolio = [{ activity: string, description: string }]
