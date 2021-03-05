interface Recipe {
	name: string;
	bakingTime: number;
	ingredients: string[];
}


export const recipes: Recipe[] = [
	{
		name: 'Takoyaki',
		bakingTime: 1,
		ingredients: ['octopus', 'soja sauce']
	},
	{
		name: 'Katsudon',
		bakingTime: 2,
		ingredients: ['rice', 'pork', 'eggs']
	},
	{
		name: 'Udon',
		bakingTime: 2,
		ingredients: ['noodle', 'pork', 'eggs']
	},
	{
		name: 'Ramen',
		bakingTime: 2,
		ingredients: ['noodle', 'chicken', 'eggs']
	},
	{
		name: 'MatchaCookie',
		bakingTime: 4,
		ingredients: ['dough', 'matcha', 'chocolate', 'chief love']
	}
]