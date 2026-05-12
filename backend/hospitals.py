import requests
import os
from dotenv import load_dotenv

load_dotenv()

GOOGLE_MAPS_API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")

def find_hospitals_google(department: str, lat: float = 13.0827,
                           lon: float = 80.2707):
    # Default location: Chennai city center
    dept_keywords = {
        'CARDIOLOGY'        : 'cardiology hospital',
        'NEUROLOGY'         : 'neurology hospital',
        'ORTHOPEDICS'       : 'orthopedic hospital',
        'DERMATOLOGY'       : 'dermatology skin hospital',
        'GASTROENTEROLOGY'  : 'gastroenterology hospital',
        'INFECTIOUS DISEASE': 'infectious disease hospital',
        'ENDOCRINOLOGY'     : 'diabetes endocrinology hospital',
        'PULMONOLOGY'       : 'pulmonology chest hospital',
        'UROLOGY'           : 'urology hospital',
    }

    keyword = dept_keywords.get(department, 'hospital')

    try:
        # Google Places Nearby Search
        url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
        params = {
            "location" : f"{lat},{lon}",
            "radius"   : 10000,          # 10km radius
            "type"     : "hospital",
            "keyword"  : keyword,
            "key"      : GOOGLE_MAPS_API_KEY,
        }

        response = requests.get(url, params=params, timeout=10)
        data     = response.json()

        if data.get('status') not in ['OK', 'ZERO_RESULTS']:
            print(f"Google API error: {data.get('status')}")
            return get_default_hospitals(department)

        hospitals = []
        for place in data.get('results', [])[:5]:
            # Get place details for phone number
            place_id = place.get('place_id', '')
            phone    = get_phone_number(place_id)

            hospitals.append({
                "name"    : place.get('name', ''),
                "address" : place.get('vicinity', 'Chennai'),
                "phone"   : phone,
                "rating"  : place.get('rating', 'N/A'),
                "open_now": place.get('opening_hours', {}).get(
                             'open_now', None),
                "lat"     : place['geometry']['location']['lat'],
                "lon"     : place['geometry']['location']['lng'],
                "maps_url": f"https://www.google.com/maps/place/?q=place_id:{place_id}"
            })

        if hospitals:
            return hospitals

    except Exception as e:
        print(f"Google Maps API error: {e}")

    return get_default_hospitals(department)


def get_phone_number(place_id: str):
    try:
        url    = "https://maps.googleapis.com/maps/api/place/details/json"
        params = {
            "place_id" : place_id,
            "fields"   : "formatted_phone_number",
            "key"      : GOOGLE_MAPS_API_KEY,
        }
        response = requests.get(url, params=params, timeout=5)
        data     = response.json()
        return data.get('result', {}).get(
               'formatted_phone_number', 'Not available')
    except:
        return 'Not available'


def find_hospitals(department: str):
    if GOOGLE_MAPS_API_KEY:
        return find_hospitals_google(department)
    return get_default_hospitals(department)


def get_default_hospitals(department: str):
    hospitals = {
        'CARDIOLOGY': [
            {"name": "Apollo Hospitals", "address": "Greams Road, Chennai", "phone": "044-28293333", "rating": 4.5, "lat": 13.0569, "lon": 80.2425, "maps_url": "https://maps.google.com/?q=Apollo+Hospitals+Chennai"},
            {"name": "Fortis Malar Hospital", "address": "Adyar, Chennai", "phone": "044-42892222", "rating": 4.3, "lat": 13.0012, "lon": 80.2565, "maps_url": "https://maps.google.com/?q=Fortis+Malar+Chennai"},
            {"name": "MIOT International", "address": "Manapakkam, Chennai", "phone": "044-22490000", "rating": 4.6, "lat": 13.0149, "lon": 80.1818, "maps_url": "https://maps.google.com/?q=MIOT+International+Chennai"},
        ],
        'NEUROLOGY': [
            {"name": "Apollo Hospitals", "address": "Greams Road, Chennai", "phone": "044-28293333", "rating": 4.5, "lat": 13.0569, "lon": 80.2425, "maps_url": "https://maps.google.com/?q=Apollo+Hospitals+Chennai"},
            {"name": "Sri Ramachandra Hospital", "address": "Porur, Chennai", "phone": "044-24768027", "rating": 4.4, "lat": 13.0359, "lon": 80.1573, "maps_url": "https://maps.google.com/?q=Sri+Ramachandra+Hospital+Chennai"},
            {"name": "Vijaya Hospital", "address": "Vadapalani, Chennai", "phone": "044-24809000", "rating": 4.2, "lat": 13.0490, "lon": 80.2121, "maps_url": "https://maps.google.com/?q=Vijaya+Hospital+Chennai"},
        ],
        'ORTHOPEDICS': [
            {"name": "MIOT International", "address": "Manapakkam, Chennai", "phone": "044-22490000", "rating": 4.6, "lat": 13.0149, "lon": 80.1818, "maps_url": "https://maps.google.com/?q=MIOT+International+Chennai"},
            {"name": "Apollo Hospitals", "address": "Greams Road, Chennai", "phone": "044-28293333", "rating": 4.5, "lat": 13.0569, "lon": 80.2425, "maps_url": "https://maps.google.com/?q=Apollo+Hospitals+Chennai"},
            {"name": "Kauvery Hospital", "address": "Alwarpet, Chennai", "phone": "044-28151234", "rating": 4.4, "lat": 13.0339, "lon": 80.2518, "maps_url": "https://maps.google.com/?q=Kauvery+Hospital+Chennai"},
        ],
        'DERMATOLOGY': [
            {"name": "Apollo Hospitals", "address": "Greams Road, Chennai", "phone": "044-28293333", "rating": 4.5, "lat": 13.0569, "lon": 80.2425, "maps_url": "https://maps.google.com/?q=Apollo+Hospitals+Chennai"},
            {"name": "Kauvery Hospital", "address": "Alwarpet, Chennai", "phone": "044-28151234", "rating": 4.4, "lat": 13.0339, "lon": 80.2518, "maps_url": "https://maps.google.com/?q=Kauvery+Hospital+Chennai"},
            {"name": "Gleneagles Global Health City", "address": "Perumbakkam, Chennai", "phone": "044-44777000", "rating": 4.3, "lat": 12.9279, "lon": 80.2131, "maps_url": "https://maps.google.com/?q=Gleneagles+Chennai"},
        ],
        'GASTROENTEROLOGY': [
            {"name": "Apollo Hospitals", "address": "Greams Road, Chennai", "phone": "044-28293333", "rating": 4.5, "lat": 13.0569, "lon": 80.2425, "maps_url": "https://maps.google.com/?q=Apollo+Hospitals+Chennai"},
            {"name": "Fortis Malar Hospital", "address": "Adyar, Chennai", "phone": "044-42892222", "rating": 4.3, "lat": 13.0012, "lon": 80.2565, "maps_url": "https://maps.google.com/?q=Fortis+Malar+Chennai"},
            {"name": "Sri Ramachandra Hospital", "address": "Porur, Chennai", "phone": "044-24768027", "rating": 4.4, "lat": 13.0359, "lon": 80.1573, "maps_url": "https://maps.google.com/?q=Sri+Ramachandra+Hospital+Chennai"},
        ],
        'INFECTIOUS DISEASE': [
            {"name": "Government Stanley Hospital", "address": "Park Town, Chennai", "phone": "044-25281424", "rating": 4.0, "lat": 13.0983, "lon": 80.2876, "maps_url": "https://maps.google.com/?q=Government+Stanley+Hospital+Chennai"},
            {"name": "Apollo Hospitals", "address": "Greams Road, Chennai", "phone": "044-28293333", "rating": 4.5, "lat": 13.0569, "lon": 80.2425, "maps_url": "https://maps.google.com/?q=Apollo+Hospitals+Chennai"},
            {"name": "Rajiv Gandhi Government Hospital", "address": "Park Town, Chennai", "phone": "044-25305000", "rating": 4.0, "lat": 13.0836, "lon": 80.2824, "maps_url": "https://maps.google.com/?q=Rajiv+Gandhi+Government+Hospital+Chennai"},
        ],
        'ENDOCRINOLOGY': [
            {"name": "Apollo Hospitals", "address": "Greams Road, Chennai", "phone": "044-28293333", "rating": 4.5, "lat": 13.0569, "lon": 80.2425, "maps_url": "https://maps.google.com/?q=Apollo+Hospitals+Chennai"},
            {"name": "Kauvery Hospital", "address": "Alwarpet, Chennai", "phone": "044-28151234", "rating": 4.4, "lat": 13.0339, "lon": 80.2518, "maps_url": "https://maps.google.com/?q=Kauvery+Hospital+Chennai"},
            {"name": "Fortis Malar Hospital", "address": "Adyar, Chennai", "phone": "044-42892222", "rating": 4.3, "lat": 13.0012, "lon": 80.2565, "maps_url": "https://maps.google.com/?q=Fortis+Malar+Chennai"},
        ],
        'PULMONOLOGY': [
            {"name": "Apollo Hospitals", "address": "Greams Road, Chennai", "phone": "044-28293333", "rating": 4.5, "lat": 13.0569, "lon": 80.2425, "maps_url": "https://maps.google.com/?q=Apollo+Hospitals+Chennai"},
            {"name": "Sri Ramachandra Hospital", "address": "Porur, Chennai", "phone": "044-24768027", "rating": 4.4, "lat": 13.0359, "lon": 80.1573, "maps_url": "https://maps.google.com/?q=Sri+Ramachandra+Hospital+Chennai"},
            {"name": "Gleneagles Global Health City", "address": "Perumbakkam, Chennai", "phone": "044-44777000", "rating": 4.3, "lat": 12.9279, "lon": 80.2131, "maps_url": "https://maps.google.com/?q=Gleneagles+Chennai"},
        ],
        'UROLOGY': [
            {"name": "Apollo Hospitals", "address": "Greams Road, Chennai", "phone": "044-28293333", "rating": 4.5, "lat": 13.0569, "lon": 80.2425, "maps_url": "https://maps.google.com/?q=Apollo+Hospitals+Chennai"},
            {"name": "MIOT International", "address": "Manapakkam, Chennai", "phone": "044-22490000", "rating": 4.6, "lat": 13.0149, "lon": 80.1818, "maps_url": "https://maps.google.com/?q=MIOT+International+Chennai"},
            {"name": "Kauvery Hospital", "address": "Alwarpet, Chennai", "phone": "044-28151234", "rating": 4.4, "lat": 13.0339, "lon": 80.2518, "maps_url": "https://maps.google.com/?q=Kauvery+Hospital+Chennai"},
        ],
    }

    return hospitals.get(department, [
        {"name": "Apollo Hospitals", "address": "Greams Road, Chennai", "phone": "044-28293333", "rating": 4.5, "lat": 13.0569, "lon": 80.2425, "maps_url": "https://maps.google.com/?q=Apollo+Hospitals+Chennai"},
        {"name": "Fortis Malar Hospital", "address": "Adyar, Chennai", "phone": "044-42892222", "rating": 4.3, "lat": 13.0012, "lon": 80.2565, "maps_url": "https://maps.google.com/?q=Fortis+Malar+Chennai"},
        {"name": "MIOT International", "address": "Manapakkam, Chennai", "phone": "044-22490000", "rating": 4.6, "lat": 13.0149, "lon": 80.1818, "maps_url": "https://maps.google.com/?q=MIOT+International+Chennai"},
    ])