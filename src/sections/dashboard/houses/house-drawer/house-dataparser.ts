import { Houses } from "src/types/house";

export const houseDataParser = (data: any) => {
  let house: Houses = {
    id: "",
    state: "",
    town: "",
    latitude: 0,
    longitude: 0,
    property_address_national_registry: "",
    property_address_record: "",
    property_picture: "",
    //ids
    owners_id: "",
    property_id_number_national_registry: "",
    cadastral_id_number_from_national_registry: "",
    id_number_municipal_record: 0,
    sequential_number_record: "",
    volume: "",
    sheet: "",
    //owner
    property_owners_according_deeds_municipal_records: "",
    property_owners_phone_number: "",
    owners_name_national_registry: "",
    name_on_file_municipal_taxes: "",
    municipal_taxes_account_number: "",
    //construction
    type_of_property: "",
    total_area_deeds: 0,
    type_of_terrain: "",
    area: "",
    construction_area_owner: 0,
    number_floors_property: 0,
    electricity_meter_number: "",
    //paving
    sidewalk_condition: "",
    lineal_meters_property_facing_paved_street_north: 0,
    lineal_meters_property_facing_paved_street_south: 0,
    lineal_meters_property_facing_paved_street_east: 0,
    lineal_meters_property_facing_paved_street_west: 0,
    lineal_meters_property_facing_dirt_street_north: 0,
    lineal_meters_property_facing_dirt_street_south: 0,
    lineal_meters_property_facing_dirt_street_east: 0,
    lineal_meters_property_facing_dirt_street_west: 0,
    //streets
    type_street_property_sits: "",
    width_street_property_sits_north: 0,
    width_street_property_sits_south: 0,
    width_street_property_sits_east: 0,
    width_street_property_sits_west: 0,
    //property docs
    property_value_according_deeds: 0,
    // property_owners_consent_appear_private_database_commercial_purposes: boolean;

    //OPTIONAL

    //services
    electricity: "",
    running_water: "",
    internet_service: "",
    mobil_data: "",
    road: "",
    comments: "",
    water_source: "",
    sewerage: "",
    electricity_provider: "",
    water_provider: "",
    internet_service_provider: "",
    mobil_data_provider: "",
    public_lights: "",
    trash_collection_service: "",
    street_cleaning_service: "",

    //taxes
    municipal_taxes: 0,

    //weather
    weather: "",
    altitude: "",
    average_temperature: "",
    average_rainfall: "",

    //development
    developing_potential_property: "",
    agricultural_activity: "",
    type_of_agricultural_activity: "",
    type_of_animal_farming: "",
    annual_yielding: "",

    //safety
    property_risks: "",
    safety_level_area: "",

    //proximity
    proximity_education_centers: "",
    proximity_medical_centers: "",
    distance_main_city: "",
    distance_commercial_port: "",
    distance_airport: "",
    skilled_labor: "",
    unskilled_labor: "",

    //commercial
    type_commercial_activity_property: "",
    commercial_activity_property: "",
    owner_property_owner_business: "",
    business_owner_name: "",
    business_registered_municipal_record: "",

    //provisional
    total_area_property_according_national_registry: 0,
    type_deeds: "",
    property_reference_according_national_registry: "",
    property_owners_email: "",
    parcel_number_national_registry: 0,
    map_number_national_registry: 0,
    mortgage_according_national_registry: "",
    legal_impediment_sale_according_national_registry: "",
    coworker: "",
    working_form_gather_info: "",
  };

  console.log(data);

  house.state = data.state;
  house.town = data.town;
  house.latitude = data.latitude;
  house.longitude = data.longitude;
  house.property_address_national_registry =
    data.property_address_national_registry;
  house.property_address_record = data.property_address_record;
  house.property_picture = data.property_picture;
  //ids
  house.owners_id = data.owners_id;
  house.property_id_number_national_registry =
    data.property_id_number_national_registry;
  house.cadastral_id_number_from_national_registry =
    data.cadastral_id_number_from_national_registry;
  house.id_number_municipal_record = Number(data.id_number_municipal_record);
  house.sequential_number_record = data.sequential_number_record;
  house.volume = data.volume;
  house.sheet = data.sheet;
  //owner
  house.property_owners_according_deeds_municipal_records =
    data.property_owners_according_deeds_municipal_records;
  house.property_owners_phone_number = data.property_owners_phone_number;
  house.owners_name_national_registry = data.owners_name_national_registry;
  house.name_on_file_municipal_taxes = data.name_on_file_municipal_taxes;
  house.municipal_taxes_account_number = data.municipal_taxes_account_number;
  //construction
  house.type_of_property = data.type_of_property;
  house.total_area_deeds = Number(data.total_area_deeds);
  house.type_of_terrain = data.type_of_terrain;
  house.area = data.area;
  house.construction_area_owner = Number(data.construction_area_owner);
  house.number_floors_property = Number(data.number_floors_property);
  house.electricity_meter_number = data.electricity_meter_number;
  //paving
  house.sidewalk_condition = data.sidewalk_condition;
  house.lineal_meters_property_facing_paved_street_north = Number(
    data.lineal_meters_property_facing_paved_street_north
  );
  house.lineal_meters_property_facing_paved_street_south = Number(
    data.lineal_meters_property_facing_paved_street_south
  );
  house.lineal_meters_property_facing_paved_street_east = Number(
    data.lineal_meters_property_facing_paved_street_east
  );
  house.lineal_meters_property_facing_paved_street_west = Number(
    data.lineal_meters_property_facing_paved_street_west
  );
  house.lineal_meters_property_facing_dirt_street_north = Number(
    data.lineal_meters_property_facing_dirt_street_north
  );
  house.lineal_meters_property_facing_dirt_street_south = Number(
    data.lineal_meters_property_facing_dirt_street_south
  );
  house.lineal_meters_property_facing_dirt_street_east = Number(
    data.lineal_meters_property_facing_dirt_street_east
  );
  house.lineal_meters_property_facing_dirt_street_west = Number(
    data.lineal_meters_property_facing_dirt_street_west
  );
  //streets
  house.type_street_property_sits = data.type_street_property_sits;
  house.width_street_property_sits_north = Number(
    data.width_street_property_sits_north
  );
  house.width_street_property_sits_south = Number(
    data.width_street_property_sits_south
  );
  house.width_street_property_sits_east = Number(
    data.width_street_property_sits_east
  );
  house.width_street_property_sits_west = Number(
    data.width_street_property_sits_west
  );
  //property docs
  house.property_value_according_deeds = Number(
    data.property_value_according_deeds.split("$")[1]
  );
  // property_owners_consent_appear_private_database_commercial_purposes: boolean;
  //OPTIONAL
  if (data.electricity) house.electricity = data.electricity;
  if (data.running_water) house.running_water = data.running_water;
  if (data.internet_service) house.internet_service = data.internet_service;
  if (data.mobil_data) house.mobil_data = data.mobil_data;
  if (data.road) house.road = data.road;
  if (data.comments) house.comments = data.comments;
  if (data.water_source) house.water_source = data.water_source;
  if (data.sewerage) house.sewerage = data.sewerage;
  if (data.electricity_provider) house.electricity_provider = data.electricity_provider;
  if (data.water_provider) house.water_provider = data.water_provider;
  if (data.internet_service_provider)
    house.internet_service_provider = data.internet_service_provider;
  if (data.mobil_data_provider) house.mobil_data_provider = data.mobil_data_provider;
  if (data.public_lights) house.public_lights = data.public_lights;
  if (data.trash_collection_service)
    house.trash_collection_service = data.trash_collection_service;
  if (data.street_cleaning_service)
    house.street_cleaning_service = data.street_cleaning_service;

  //weather
  if (data.weather) house.weather = data.weather;
  if (data.altitude) house.altitude = data.altitude;
  if (data.average_temperature) house.average_temperature = data.average_temperature;
  if (data.average_rainfall) house.average_rainfall = data.average_rainfall;

  //development
  if (data.developing_potential_property)
    house.developing_potential_property = data.developing_potential_property;
  if (data.agricultural_activity)
    house.agricultural_activity = data.agricultural_activity;
  if (data.type_of_agricultural_activity)
    house.type_of_agricultural_activity = data.type_of_agricultural_activity;
  if (data.type_of_animal_farming)
    house.type_of_animal_farming = data.type_of_animal_farming;
  if (data.annual_yielding) house.annual_yielding = data.annual_yielding;

  //safety
  if (data.property_risks) house.property_risks = data.property_risks;
  if (data.safety_level_area) house.safety_level_area = data.safety_level_area;

  //proximity
  if (data.proximity_education_centers) house.proximity_education_centers = data.proximity_education_centers;
  if (data.proximity_medical_centers) house.proximity_medical_centers = data.proximity_medical_centers;
  if (data.distance_main_city) house.distance_main_city = data.distance_main_city;
  if (data.distance_commercial_port) house.distance_commercial_port = data.distance_commercial_port;
  if (data.distance_airport) house.distance_airport = data.distance_airport;
  if (data.skilled_labor) house.skilled_labor = data.skilled_labor;
  if (data.unskilled_labor) house.unskilled_labor = data.unskilled_labor;

  //commercial
  if (data.type_commercial_activity_property)
    house.type_commercial_activity_property =
      data.type_commercial_activity_property;
  if (data.commercial_activity_property)
    house.commercial_activity_property = data.commercial_activity_property;
  if (data.owner_property_owner_business)
    house.owner_property_owner_business = data.owner_property_owner_business;
  if (data.business_owner_name) house.business_owner_name = data.business_owner_name;
  if (data.business_registered_municipal_record)
    house.business_registered_municipal_record =
      data.business_registered_municipal_record;

  //taxes
  if (data.municipal_taxes) house.municipal_taxes = Number(data.municipal_taxes);

  //provisional
  if (data.total_area_property_according_national_registry)
    house.total_area_property_according_national_registry = Number(
      data.total_area_property_according_national_registry
    );
  if (data.type_deeds) house.type_deeds = data.type_deeds;
  if (data.property_reference_according_national_registry)
    house.property_reference_according_national_registry =
      data.property_reference_according_national_registry;
  if (data.property_owners_email)
    house.property_owners_email = data.property_owners_email;
  if (data.parcel_number_national_registry)
    house.parcel_number_national_registry = Number(
      data.parcel_number_national_registry
    );
  if (data.map_number_national_registry)
    house.map_number_national_registry = Number(
      data.map_number_national_registry
    );
  if (data.mortgage_according_national_registry)
    house.mortgage_according_national_registry =
      data.mortgage_according_national_registry;
  if (data.legal_impediment_sale_according_national_registry)
    house.legal_impediment_sale_according_national_registry =
      data.legal_impediment_sale_according_national_registry;
  if (data.coworker) house.coworker = data.coworker;
  if (data.working_form_gather_info)
    house.working_form_gather_info = data.working_form_gather_info;

  console.log(house);
  return house;
};
