from flask import Flask, request, jsonify
from transformers import AutoModelForCausalLM, CodeGenTokenizerFast as Tokenizer
from PIL import Image

app = Flask(__name__)

# Load the model and tokenizer
model_id = "vikhyatk/moondream1"
model = AutoModelForCausalLM.from_pretrained(model_id, trust_remote_code=True)
tokenizer = Tokenizer.from_pretrained(model_id)

# Load the default image
default_image = Image.open('./default.jpeg')
default_image_embeds = model.encode_image(default_image)

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
            response = model.answer_question(image_embeds, query, tokenizer)
            
            # Return the response as JSON
            return jsonify({'response': response})
        else:
            return jsonify({'error': 'Missing query in the JSON payload'}), 400
    else:
        return jsonify({'error': 'Invalid JSON payload'}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)