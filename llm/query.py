from sentence_transformers import SentenceTransformer
from annoy import AnnoyIndex


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

def query(model, index, query, k):
    """ Returns top-k closest matching vectors to a query
        from an annoy index.
        model:  SentenceTransformer model used for encoding the query
        index:  AnnoyIndex used for nearest neighbor search
        query:  string that we want to find the closest match for in the index
        k:      integer, the number of closest matches to return
        returns: list[str], containing the unvectorized matches"""
    vector = model.encode([query])[0]
    return index.get_nns_by_vector(vector, k)

if __name__ == "__main__":
    # Load the model
    model = SentenceTransformer('all-MiniLM-L6-v2')
    vector_dim = model.encode(['hi']).shape[1]
    # Load the vectordb
    annoy_index = AnnoyIndex(vector_dim, 'angular')
    annoy_index.load('recipe_index.ann')
    # Load the recipe array
    recipes = recipes # TODO: make this load from a file
    # Example query
    prompt = "Something sweet, but still healthy"
    for q in query(model, annoy_index, prompt, 3):
        print(recipes[q])



