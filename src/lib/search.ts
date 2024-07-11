import { type EC } from '$lib/types/database';

function calculate_relevance(ec: EC, query: String): number {
    let score = 0;
    const query_lower = query.toLowerCase();

    if (ec.name.toLowerCase().includes(query_lower)) {
        score += 2;
    }

    return score;
}

export async function keyword_search(query: string, ecs: EC[]): Promise<EC[] | boolean> {
    const results: { [key: string]: number } = {};

    ecs.forEach((ec) => {
        results[ec.name] = calculate_relevance(ec, query);
    });

    // Check if all relevance scores are 0
    const all_scores_zero = Object.values(results).every(score => score === 0);
    console.log(all_scores_zero)

    if (all_scores_zero) {
        return false; // Return false if all scores are 0
    }

    const ecs_copy = [...ecs];

    ecs_copy.sort((a, b) => results[b.name] - results[a.name]);

    return ecs_copy;
}

export function filter_ecs(
    ecs: EC[],
    grades: string[],
    categories: string[],
    locations: string[],
    org_type: string[],
    skill_levels: string[],
    subjects: string[],
    team_individual: string,
    time_commitment: string
) {
    let matching_ecs: EC[] = [];

    ecs.forEach(ec => {
        let matching_grades = grades.filter(grade => ec.grades.includes(grade));
        let matching_categories = categories.filter(category => ec.categories.includes(category));
        let matching_locations = locations.filter(location => ec.locations.includes(location));
        let matching_org_type = org_type.filter(org => ec.org_types.includes(org));
        let matching_skill_levels = skill_levels.filter(skill_level => ec.skill_levels.includes(skill_level));
        let matching_subjects = subjects.filter(subject => ec.subjects.includes(subject));

        if (
            (grades.length == 0 || matching_grades.length > 0) &&
            (categories.length == 0 || matching_categories.length > 0) &&
            (locations.length == 0 || matching_locations.length > 0) &&
            (org_type.length == 0 || matching_org_type.length > 0) &&
            (skill_levels.length == 0 || matching_skill_levels.length > 0) &&
            (subjects.length == 0 || matching_subjects.length > 0) &&
            (team_individual.length == 0 || team_individual === ec.team_individual) &&
            (time_commitment.length == 0 || time_commitment === ec.time_commitment)
        ) {
            matching_ecs.push(ec);
        }
    });

    return matching_ecs;
}
