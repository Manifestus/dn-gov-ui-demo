export enum houseEnum {
  //REQUIRED

  //main
  state = "property-info",
  town = "property-info",
  latitude = "property-info",
  longitude = "property-info",
  property_address_national_registry = "property-info",
  property_address_record = "property-info",
  property_picture = "property-photo",
  //ids
  owners_id = "owner-info",
  property_id_number_national_registry = "property-info",
  cadastral_id_number_from_national_registry = "property-info",
  id_number_municipal_record = "owner-info",
  sequential_number_record = "property-info",
  volume = "property-info",
  sheet = "property-info",
  //owner
  property_owners_according_deeds_municipal_records = "property-info",
  property_owners_phone_number = "owner-info",
  owners_name_national_registry = "property-info",
  name_on_file_municipal_taxes = "property-info",
  municipal_taxes_account_number = "property-info",
  //construction
  type_of_property = "property-info",
  total_area_deeds = "property-info",
  type_of_terrain = "property-info",
  area = "property-info",
  construction_area_owner = "property-info",
  number_floors_property = "property-info",
  electricity_meter_number = "property-info",
  //paving
  sidewalk_condition = "property-pavement",
  lineal_meters_property_facing_paved_street_north = "property-pavement",
  lineal_meters_property_facing_paved_street_south = "property-pavement",
  lineal_meters_property_facing_paved_street_east = "property-pavement",
  lineal_meters_property_facing_paved_street_west = "property-pavement",
  lineal_meters_property_facing_dirt_street_north = "property-dirt",
  lineal_meters_property_facing_dirt_street_south = "property-dirt",
  lineal_meters_property_facing_dirt_street_east = "property-dirt",
  lineal_meters_property_facing_dirt_street_west = "property-dirt",
  //streets
  type_street_property_sits = "property-street",
  width_street_property_sits_north = "property-street",
  width_street_property_sits_south = "property-street",
  width_street_property_sits_east = "property-street",
  width_street_property_sits_west = "property-street",
  //property docs
  property_value_according_deeds = "property-value",
  // property_owners_consent_appear_private_database_commercial_purposes: boolean;

  //OPTIONAL

  //services
  electricity = "property-services",
  running_water = "property-services",
  internet_service = "property-services",
  mobil_data = "property-services",
  road = "property-services",
  comments = "property-services",
  water_source = "property-services",
  sewerage = "property-services",
  electricity_provider = "property-services",
  water_provider = "property-services",
  internet_service_provider = "property-services",
  mobil_data_provider = "property-services",
  public_lights = "property-services",
  trash_collection_service = "property-services",
  street_cleaning_service = "property-services",

  //taxes
  municipal_taxes = "property-tax",

  //weather
  weather = "property-weather",
  altitude = "property-weather",
  average_temperature = "property-weather",
  average_rainfall = "property-weather",

  //development
  developing_potential_property = "property-dev",
  agricultural_activity = "property-dev",
  type_of_agricultural_activity = "property-dev",
  type_of_animal_farming = "property-dev",
  annual_yielding = "property-dev",

  //safety
  property_risks = "property-safety",
  safety_level_area = "property-safety",

  //proximity
  proximity_education_centers = "property-prox",
  proximity_medical_centers = "property-prox",
  distance_main_city = "property-prox",
  distance_commercial_port = "property-prox",
  distance_airport = "property-prox",
  skilled_labor = "property-prox",
  unskilled_labor = "property-prox",

  //commercial
  type_commercial_activity_property = "property-commercial",
  commercial_activity_property = "property-commercial",
  owner_property_owner_business = "property-commercial",
  business_owner_name = "property-commercial",
  business_registered_municipal_record = "property-commercial",

  //provisional
  total_area_property_according_national_registry = "property-prov",
  type_deeds = "property-prov",
  property_reference_according_national_registry = "property-prov",
  property_owners_email = "property-prov",
  parcel_number_national_registry = "property-prov",
  map_number_national_registry = "property-prov",
  mortgage_according_national_registry = "property-prov",
  legal_impediment_sale_according_national_registry = "property-prov",
  coworker = "property-prov",
  working_form_gather_info = "property-prov",
}
