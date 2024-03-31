from sentence_transformers import SentenceTransformer
import numpy as np
from annoy import AnnoyIndex

# Load the pre-trained sentence embeddings model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Example recipes
recipes = [
    "Spaghetti Carbonara",
    "Chicken Tikka Masala",
    "Beef Stroganoff",
    "Vegetable Stir-Fry",
    "Mushroom Risotto",
    "Pesto Pasta",
    "Chili Con Carne",
    "Grilled Salmon with Lemon Butter Sauce",
    "Roasted Garlic Mashed Potatoes",
    "Chocolate Chip Cookies"
]

# Encode the recipes into vectors using the sentence embeddings model
recipe_vectors = model.encode(recipes)

# Initialize the Annoy index
vector_dim = recipe_vectors.shape[1]
annoy_index = AnnoyIndex(vector_dim, 'angular')

# Add recipe vectors to the index
for i, vector in enumerate(recipe_vectors):
    annoy_index.add_item(i, vector)

# Build the index
num_trees = 10  # Adjust this based on your requirements
annoy_index.build(num_trees)

# Save the index to a file
annoy_index.save('recipe_index.ann')

# Example usage: Find the most similar recipe to a query
query = "Pasta with tomato sauce"
query_vector = model.encode([query])[0]

# Find the closest recipe in the Annoy index
closest_index = annoy_index.get_nns_by_vector(query_vector, 1)[0]
closest_recipe = recipes[closest_index]

print(f"Query: {query}")
print(f"Closest recipe: {closest_recipe}")