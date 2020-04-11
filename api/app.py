from populartimes import get_id
from flask import Flask, jsonify
import googlemaps

# create flask instance
application = Flask(__name__)
app = application

# set up config file
app.config.from_pyfile("config.cfg")
API_KEY = app.config["API_KEY"]

# set up google maps api
gmaps = googlemaps.Client(key=API_KEY)

@app.route("/test")
def test():
    return "Success!"

@app.route("/api/<keyword>/<lat>/<lng>")
def render_request(keyword, lat, lng):
    places = gmaps.places(query=keyword, location=(lat, lng))

    place_ids = []
    json = []
	
	# Get place results within a range (i.e. 10) 
    for i in range(10):
        try:
			# Create list of place ids from google places api
            place_ids.append(places["results"][i]["place_id"])

			# Use place ids to create json data using populartimes library
            json.append(get_id(API_KEY, place_ids[i]))
        except KeyError:
            pass

	# If the place doesn't have a current_popularity key (live population data), 
	# add one and set to null
    for place in json:
        if "current_popularity" not in place:
            place.update( {"current_popularity" : None})

    return jsonify(json)
