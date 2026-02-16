<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = ['Technology', 'Science', 'Lifestyle', 'Business'];

        foreach ($categories as $name) {
            Category::create([
                'name' => $name,
                'slug' => strtolower(str_replace(' ', '-', $name)),
            ]);
        }
    }
}