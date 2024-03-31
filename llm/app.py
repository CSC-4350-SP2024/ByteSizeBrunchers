from PIL import Image
from annoy import AnnoyIndex
from flask import Flask, request, jsonify
from transformers import AutoModelForCausalLM, CodeGenTokenizerFast as Tokenizer
from sentence_transformers import SentenceTransformer

app = Flask(__name__)

# Load the model and tokenizer
model_id = "vikhyatk/moondream1"
model = AutoModelForCausalLM.from_pretrained(model_id, trust_remote_code=True)
tokenizer = Tokenizer.from_pretrained(model_id)

# Load the default image
default_image = Image.open('./default.jpeg')
default_image_embeds = model.encode_image(default_image)

# Load recipes index
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
emb_model = SentenceTransformer('all-MiniLM-L6-v2')
vector_dim = emb_model.encode(["hi"]).shape[1]
annoy_index = AnnoyIndex(vector_dim, 'angular')
annoy_index.load('recipe_index.ann')

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

@app.route('/query', methods=['POST'])
def query_endpoint():
    data = request.get_json()
    
    if data:
        # Extract the necessary information from the JSON payload
        query = data.get('query')
        
        if query:
            # Use the default image if image_embeds is None
            image_embeds = default_image_embeds
            
            # Call the model.answer_question function with the extracted query and image_embeds
            print(image_embeds.shape)
            print(query)
            response = model.answer_question(image_embeds, query, tokenizer)
            """
            print(response)
            recipe = query(emb_model, annoy_index, response, 1)
            print(recipe)
            # Return the response as JSON
            """
            return jsonify({'response': recipe})
        else:
            return jsonify({'error': 'Missing query in the JSON payload'}), 400
    else:
        return jsonify({'error': 'Invalid JSON payload'}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
