import requests

def get_default_hospitals(department: str):
    hospitals = {
        'CARDIOLOGY': [
            {"name": "Apollo Hospitals", "address": "Greams Road, Chennai", "phone": "044-28293333", "lat": 13.0569, "lon": 80.2425},
            {"name": "Fortis Malar Hospital", "address": "Adyar, Chennai", "phone": "044-42892222", "lat": 13.0012, "lon": 80.2565},
            {"name": "MIOT International", "address": "Manapakkam, Chennai", "phone": "044-22490000", "lat": 13.0149, "lon": 80.1818},
        ],
        'NEUROLOGY': [
            {"name": "Apollo Hospitals", "address": "Greams Road, Chennai", "phone": "044-28293333", "lat": 13.0569, "lon": 80.2425},
            {"name": "Sri Ramachandra Hospital", "address": "Porur, Chennai", "phone": "044-24768027", "lat": 13.0359, "lon": 80.1573},
            {"name": "Vijaya Hospital", "address": "Vadapalani, Chennai", "phone": "044-24809000", "lat": 13.0490, "lon": 80.2121},
        ],
        'ORTHOPEDICS': [
            {"name": "MIOT International", "address": "Manapakkam, Chennai", "phone": "044-22490000", "lat": 13.0149, "lon": 80.1818},
            {"name": "Apollo Hospitals", "address": "Greams Road, Chennai", "phone": "044-28293333", "lat": 13.0569, "lon": 80.2425},
            {"name": "Kauvery Hospital", "address": "Alwarpet, Chennai", "phone": "044-28151234", "lat": 13.0339, "lon": 80.2518},
        ],
        'DERMATOLOGY': [
            {"name": "Apollo Hospitals", "address": "Greams Road, Chennai", "phone": "044-28293333", "lat": 13.0569, "lon": 80.2425},
            {"name": "Kauvery Hospital", "address": "Alwarpet, Chennai", "phone": "044-28151234", "lat": 13.0339, "lon": 80.2518},
            {"name": "Gleneagles Global Health City", "address": "Perumbakkam, Chennai", "phone": "044-44777000", "lat": 12.9279, "lon": 80.2131},
        ],
        'GASTROENTEROLOGY': [
            {"name": "Apollo Hospitals", "address": "Greams Road, Chennai", "phone": "044-28293333", "lat": 13.0569, "lon": 80.2425},
            {"name": "Fortis Malar Hospital", "address": "Adyar, Chennai", "phone": "044-42892222", "lat": 13.0012, "lon": 80.2565},
            {"name": "Sri Ramachandra Hospital", "address": "Porur, Chennai", "phone": "044-24768027", "lat": 13.0359, "lon": 80.1573},
        ],
        'INFECTIOUS DISEASE': [
            {"name": "Government Stanley Hospital", "address": "Park Town, Chennai", "phone": "044-25281424", "lat": 13.0983, "lon": 80.2876},
            {"name": "Apollo Hospitals", "address": "Greams Road, Chennai", "phone": "044-28293333", "lat": 13.0569, "lon": 80.2425},
            {"name": "Rajiv Gandhi Government Hospital", "address": "Park Town, Chennai", "phone": "044-25305000", "lat": 13.0836, "lon": 80.2824},
        ],
        'ENDOCRINOLOGY': [
            {"name": "Apollo Hospitals", "address": "Greams Road, Chennai", "phone": "044-28293333", "lat": 13.0569, "lon": 80.2425},
            {"name": "Kauvery Hospital", "address": "Alwarpet, Chennai", "phone": "044-28151234", "lat": 13.0339, "lon": 80.2518},
            {"name": "Fortis Malar Hospital", "address": "Adyar, Chennai", "phone": "044-42892222", "lat": 13.0012, "lon": 80.2565},
        ],
        'PULMONOLOGY': [
            {"name": "Apollo Hospitals", "address": "Greams Road, Chennai", "phone": "044-28293333", "lat": 13.0569, "lon": 80.2425},
            {"name": "Sri Ramachandra Hospital", "address": "Porur, Chennai", "phone": "044-24768027", "lat": 13.0359, "lon": 80.1573},
            {"name": "Gleneagles Global Health City", "address": "Perumbakkam, Chennai", "phone": "044-44777000", "lat": 12.9279, "lon": 80.2131},
        ],
        'UROLOGY': [
            {"name": "Apollo Hospitals", "address": "Greams Road, Chennai", "phone": "044-28293333", "lat": 13.0569, "lon": 80.2425},
            {"name": "MIOT International", "address": "Manapakkam, Chennai", "phone": "044-22490000", "lat": 13.0149, "lon": 80.1818},
            {"name": "Kauvery Hospital", "address": "Alwarpet, Chennai", "phone": "044-28151234", "lat": 13.0339, "lon": 80.2518},
        ],
    }

    return hospitals.get(department, [
        {"name": "Apollo Hospitals", "address": "Greams Road, Chennai", "phone": "044-28293333", "lat": 13.0569, "lon": 80.2425},
        {"name": "Fortis Malar Hospital", "address": "Adyar, Chennai", "phone": "044-42892222", "lat": 13.0012, "lon": 80.2565},
        {"name": "MIOT International", "address": "Manapakkam, Chennai", "phone": "044-22490000", "lat": 13.0149, "lon": 80.1818},
    ])


def find_hospitals(department: str):
    # Try OpenStreetMap first
    try:
        query = """
        [out:json][timeout:25];
        area["name"="Chennai"]["admin_level"="8"]->.searchArea;
        (
          node["amenity"="hospital"](area.searchArea);
          way["amenity"="hospital"](area.searchArea);
        );
        out center 10;
        """
        response = requests.get(
            "https://overpass-api.de/api/interpreter",
            params={"data": query},
            timeout=15
        )

        if response.status_code == 200 and response.text.strip():
            data = response.json()
            elements = data.get('elements', [])
            hospitals = []

            for element in elements[:10]:
                tags = element.get('tags', {})
                name = tags.get('name', '')
                if not name:
                    continue

                if element['type'] == 'node':
                    lat = element.get('lat', 0)
                    lon = element.get('lon', 0)
                else:
                    center = element.get('center', {})
                    lat = center.get('lat', 0)
                    lon = center.get('lon', 0)

                hospitals.append({
                    "name"   : name,
                    "address": tags.get('addr:full',
                               tags.get('addr:street', 'Chennai')),
                    "phone"  : tags.get('phone', 'Not available'),
                    "lat"    : lat,
                    "lon"    : lon,
                })

            if hospitals:
                return hospitals

    except Exception as e:
        print(f"OpenStreetMap failed: {e}")

    # Always fallback to default hospitals
    print(f"Using default hospitals for {department}")
    return get_default_hospitals(department)