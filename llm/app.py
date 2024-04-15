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
    """Spaghetti Carbonara
Ingredients:

    1 lb spaghetti
    1/2 lb pancetta or bacon, diced
    4 large eggs
    1 cup grated Parmesan cheese
    1/2 cup grated Pecorino Romano cheese
    Black pepper to taste

Steps:

    Cook the spaghetti in a large pot of salted boiling water until al dente. Reserve 1 cup of pasta water before draining.
    In a large skillet, cook the pancetta or bacon over medium heat until crisp. Remove from heat.
    In a large bowl, whisk together the eggs, Parmesan, Pecorino Romano, and black pepper.
    Add the hot, drained spaghetti to the egg mixture and toss quickly to coat the pasta. Add some reserved pasta water if needed to achieve a creamy consistency.
    Add the pancetta or bacon and toss to combine. Serve immediately.

Notes:

    The heat from the pasta cooks the eggs, so it's important to work quickly and not let the eggs scramble.
    Adjust the amount of reserved pasta water to achieve your desired sauce consistency.
""",
    """Chicken Tikka Masala
Ingredients:

    1 lb boneless, skinless chicken breasts, cut into bite-sized pieces
    1 cup plain yogurt
    2 tbsp lemon juice
    2 tsp cumin
    2 tsp paprika
    1 tsp cinnamon
    1/2 tsp cayenne pepper
    1 tbsp grated fresh ginger
    4 cloves garlic, minced
    1 tbsp oil
    1 onion, diced
    1 can (14 oz) crushed tomatoes
    1 cup heavy cream
    1/4 cup chopped fresh cilantro

Steps:

    In a large bowl, combine yogurt, lemon juice, cumin, paprika, cinnamon, cayenne, ginger, and garlic. Add chicken and toss to coat. Marinate in the refrigerator for at least 1 hour.
    Heat oil in a large skillet over medium heat. Add onion and cook until softened.
    Add the marinated chicken and cook until browned.
    Stir in crushed tomatoes and heavy cream. Simmer for 10-15 minutes until chicken is cooked through and sauce has thickened.
    Garnish with cilantro and serve over rice.

Notes:

    For a spicier dish, increase the amount of cayenne pepper.
    Grill or broil the marinated chicken for added flavor before adding to the sauce.
""",
    """Beef Stroganoff
Ingredients:

    1 lb beef sirloin, cut into thin strips
    2 tbsp all-purpose flour
    2 tbsp butter
    1 onion, diced
    8 oz sliced mushrooms
    2 cloves garlic, minced
    1 cup beef broth
    1/2 cup sour cream
    1 tbsp Dijon mustard
    Salt and pepper to taste
    Fresh parsley, chopped (for garnish)

Steps:

    Season the beef strips with salt and pepper, then dust with flour.
    In a large skillet, melt the butter over medium-high heat. Add the beef strips and cook until browned on all sides. Remove the beef and set aside.
    In the same skillet, add the onion and mushrooms. Cook until the vegetables are softened and the mushrooms have released their liquid.
    Add garlic and cook for an additional minute.
    Stir in the beef broth, scraping the bottom of the pan to deglaze. Bring to a simmer and cook until the liquid has reduced slightly.
    Reduce heat to low and stir in the sour cream and Dijon mustard. Return the beef to the skillet and simmer for 5 minutes, or until the beef is heated through and the sauce has thickened.
    Season with salt and pepper to taste. Serve over egg noodles or rice, garnished with chopped parsley.

Notes:

    For a creamier sauce, add more sour cream or substitute with heavy cream.
    Adjust the amount of Dijon mustard to your taste preference.
""",
    """Vegetable Stir-Fry
Ingredients:

    2 tbsp vegetable oil
    1 onion, sliced
    2 cloves garlic, minced
    1 inch ginger, grated
    2 carrots, sliced
    1 red bell pepper, sliced
    1 cup broccoli florets
    1 cup snow peas
    1/4 cup soy sauce
    1 tbsp honey
    1 tsp sesame oil
    1 tbsp cornstarch
    1/4 cup water
    Sesame seeds (for garnish)

Steps:

    In a large wok or skillet, heat the vegetable oil over medium-high heat.
    Add the onion and cook until softened, about 2-3 minutes.
    Add the garlic and ginger, and cook for an additional minute.
    Add the carrots and bell pepper, and stir-fry for 2-3 minutes.
    Add the broccoli and snow peas, and stir-fry for an additional 2-3 minutes, or until the vegetables are crisp-tender.
    In a small bowl, whisk together the soy sauce, honey, sesame oil, cornstarch, and water.
    Pour the sauce over the vegetables and stir-fry until the sauce has thickened and coats the vegetables, about 1-2 minutes.
    Serve hot over rice, garnished with sesame seeds.

Notes:

    Feel free to substitute or add your favorite vegetables, such as mushrooms, baby corn, or bok choy.
    Adjust the amount of soy sauce and honey to your taste preference.
    For a spicier dish, add red pepper flakes or sriracha sauce to the stir-fry sauce.
""",
    """Mushroom Risotto
Ingredients:

    6 cups vegetable or chicken stock
    2 tbsp olive oil
    1 onion, diced
    2 cloves garlic, minced
    1 1/2 cups Arborio rice
    1/2 cup dry white wine
    1 lb mixed mushrooms (such as shiitake, cremini, and oyster), sliced
    1/2 cup grated Parmesan cheese
    2 tbsp unsalted butter
    Fresh parsley, chopped (for garnish)

Steps:

    In a saucepan, heat the stock and keep it at a simmer.
    In a large, heavy-bottomed pot, heat the olive oil over medium heat. Add the onion and cook until softened, about 5 minutes.
    Add the garlic and cook for an additional minute.
    Add the Arborio rice and stir to coat the grains with oil. Toast the rice for 2-3 minutes, or until it becomes slightly translucent.
    Pour in the white wine and stir until the wine is absorbed.
    Begin adding the hot stock to the rice, one ladleful at a time. Stir constantly and allow each ladleful to be absorbed before adding the next. Continue this process until the rice is tender and creamy, about 20-25 minutes.
    In a separate skillet, sauté the sliced mushrooms until they release their liquid and become tender.
    Stir the cooked mushrooms, Parmesan cheese, and butter into the risotto. Season with salt and pepper to taste.
    Serve hot, garnished with chopped parsley.

Notes:

    Constant stirring is essential for a creamy risotto, as it helps release the starch from the rice.
    Adjust the amount of stock as needed; the risotto should be creamy but not soupy.
""",
    """Pesto Pasta
Ingredients:

    1 lb pasta (such as spaghetti, linguine, or fusilli)
    2 cups fresh basil leaves
    1/2 cup grated Parmesan cheese
    1/2 cup extra virgin olive oil
    1/3 cup pine nuts (or walnuts)
    3 cloves garlic
    Salt and pepper to taste
    Cherry tomatoes, halved (optional)

Steps:

    Cook the pasta in a large pot of salted boiling water until al dente. Reserve 1/2 cup of pasta water before draining.
    In a food processor or blender, combine the basil leaves, Parmesan cheese, olive oil, pine nuts (or walnuts), garlic, salt, and pepper. Pulse until the mixture forms a smooth paste.
    In a large bowl, toss the cooked pasta with the pesto sauce. Add some of the reserved pasta water if needed to help the sauce coat the pasta evenly.
    If desired, add halved cherry tomatoes for added freshness and flavor.
    Serve hot, garnished with additional Parmesan cheese.

Notes:

    For a nut-free version, omit the pine nuts or walnuts and increase the amount of Parmesan cheese.
    Pesto can be stored in the refrigerator for up to a week or frozen for up to 3 months.
""",
    """Grilled Salmon with Lemon Butter Sauce
Ingredients:

    4 salmon fillets (6 oz each)
    Salt and pepper to taste
    1/4 cup unsalted butter
    2 cloves garlic, minced
    2 tbsp fresh lemon juice
    1 tbsp chopped fresh parsley
    Lemon wedges (for garnish)

Steps:

    Preheat the grill to medium-high heat.
    Season the salmon fillets with salt and pepper on both sides.
    Place the salmon fillets on the grill, skin-side down (if applicable). Grill for 5-6 minutes, or until the skin is crispy and the salmon easily releases from the grill.
    Flip the salmon and grill for an additional 2-3 minutes, or until the salmon is cooked to your desired doneness.
    In a small saucepan, melt the butter over medium heat. Add the garlic and cook for 1-2 minutes, or until fragrant.
    Remove the saucepan from the heat and stir in the lemon juice and parsley.
    Transfer the grilled salmon to a serving platter and drizzle with the lemon butter sauce.
    Serve hot, garnished with lemon wedges.

Notes:

    The cooking time for the salmon may vary depending on the thickness of the fillets and the heat of your grill.
    For added flavor, try marinating the salmon in a mixture of olive oil, lemon juice, garlic, and herbs for 30 minutes before grilling.
""",
    """Chili Con Carne
Ingredients:

    1 lb ground beef
    1 onion, diced
    3 cloves garlic, minced
    1 red bell pepper, diced
    2 tbsp chili powder
    1 tsp ground cumin
    1 tsp dried oregano
    1/2 tsp cayenne pepper (optional)
    1 can (14 oz) diced tomatoes   
    1 can (15 oz) kidney beans, drained and rinsed
    1 can (15 oz) black beans, drained and rinsed
    1 cup beef broth
    Salt and pepper to taste
    Shredded cheddar cheese, sour cream, and chopped green onions (for garnish)

Steps:

    In a large pot or Dutch oven, cook the ground beef over medium heat until browned and crumbly. Drain excess fat.
    Add the onion, garlic, and red bell pepper to the pot. Cook until the vegetables are softened, about 5 minutes.
    Stir in the chili powder, cumin, oregano, and cayenne pepper (if using). Cook for an additional minute to toast the spices.
    Add the diced tomatoes (with their juices), kidney beans, black beans, and beef broth. Stir to combine.
    Bring the chili to a simmer and cook, uncovered, for 20-30 minutes, or until the flavors have melded and the chili has thickened.
    Season with salt and pepper to taste.
    Serve hot, garnished with shredded cheddar cheese, sour cream, and chopped green onions.

Notes:

    For a spicier chili, increase the amount of chili powder or cayenne pepper.
    Adjust the consistency of the chili by adding more broth or simmering for longer to thicken.
""",
    """Roasted Garlic Mashed Potatoes
Ingredients:

    2 lbs Yukon Gold potatoes, peeled and quartered
    1 head of garlic
    2 tbsp olive oil
    1/2 cup unsalted butter
    1/2 cup heavy cream
    1/2 cup milk
    Salt and pepper to taste
    Fresh chives, chopped (for garnish)

Steps:

    Preheat the oven to 400°F (200°C).
    Cut the top off the head of garlic, exposing the cloves. Drizzle with olive oil and wrap in aluminum foil. Roast in the preheated oven for 40-45 minutes, or until the garlic is soft and golden brown.
    Meanwhile, place the peeled and quartered potatoes in a large pot and cover with cold water. Bring to a boil over high heat, then reduce the heat to medium and simmer until the potatoes are tender, about 15-20 minutes.
    Drain the potatoes and return them to the pot. Add the butter, heavy cream, and milk. Mash the potatoes until smooth.
    Squeeze the roasted garlic cloves from their skins and add them to the mashed potatoes. Stir to combine.
    Season with salt and pepper to taste.
    Serve hot, garnished with chopped chives.

Notes:

    For a lighter version, substitute the heavy cream and milk with low-fat milk or chicken broth.
    Adjust the consistency of the mashed potatoes by adding more milk or cream as needed.
""", 
    """Chocolate Chip Cookies
Ingredients:

    2 1/4 cups all-purpose flour
    1 tsp baking soda
    1 tsp salt
    1 cup unsalted butter, softened
    3/4 cup granulated sugar
    3/4 cup brown sugar
    1 tsp vanilla extract
    2 large eggs
    2 cups semisweet chocolate chips

Steps:

    Preheat the oven to 375°F (190°C). Line baking sheets with parchment paper.
    In a medium bowl, whisk together the flour, baking soda, and salt. Set aside.
    In a large bowl, cream the butter, granulated sugar, brown sugar, and vanilla extract until light and fluffy.
    Beat in the eggs one at a time, mixing well after each addition.
    Gradually stir the flour mixture into the butter mixture until just combined.
    Fold in the chocolate chips.
    Drop rounded tablespoons of the cookie dough onto the prepared baking sheets, about 2 inches apart.
    Bake for 9-11 minutes, or until the edges are golden brown and the centers are set.
    Remove from the oven and let the cookies cool on the baking sheets for 5 minutes before transferring them to wire racks to cool completely.

Notes:

    For a softer, chewier cookie, reduce the baking time by 1-2 minutes.
    Experiment with different types of chocolate chips, such as milk chocolate, dark chocolate, or white chocolate.
    Cookie dough can be frozen for up to 3 months. Simply scoop the dough onto baking sheets, freeze until solid, then transfer to a freezer bag. Bake frozen cookie dough balls for an additional 1-2 minutes.
"""
]
emb_model = SentenceTransformer('all-MiniLM-L6-v2')
vector_dim = emb_model.encode(["hi"]).shape[1]
annoy_index = AnnoyIndex(vector_dim, 'angular')
annoy_index.load('recipe_index.ann')

DEBUG=True




def query_index(model, index, query, k):
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
            if DEBUG: print(query)
            response = model.answer_question(image_embeds, query, tokenizer)
            if DEBUG: print(response)
            recipe = recipes[query_index(emb_model, annoy_index, response, 1)[0]]
            if DEBUG: print(recipe)
            # Return the response as JSON
            return jsonify({'response': recipe})
        else:
            return jsonify({'error': 'Missing query in the JSON payload'}), 400
    else:
        return jsonify({'error': 'Invalid JSON payload'}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
