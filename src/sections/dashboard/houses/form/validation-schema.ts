import { object, string, number } from "yup";

export const validationSchema = object().shape({
  id: string().max(255).required(""),
  state: string().max(255).required(""),
  town: string().max(255).required(""),
  latitude: number().max(999999999).required(""),
  longitude: number().max(999999999).required(""),
  property_address_national_registry: string().max(255).required(""),
  property_address_record: string().max(255).required(""),
  property_picture: string().max(255).required(""),
  //ids
  owners_id: string().max(255).required(""),
  property_id_number_national_registry: string().max(255).required(""),
  cadastral_id_number_from_national_registry: string().max(255).required(""),
  id_number_municipal_record: number().max(999999999).required(""),
  sequential_number_record: string().max(255).required(""),
  volume: string().max(255).required(""),
  sheet: string().max(255).required(""),
  //owner
  property_owners_according_deeds_municipal_records: string()
    .max(255)
    .required(""),
  property_owners_phone_number: string().max(255).required(""),
  owners_name_national_registry: string().max(255).required(""),
  name_on_file_municipal_taxes: string().max(255).required(""),
  municipal_taxes_account_number: string().max(255).required(""),
  //construction
  type_of_property: string().max(255).required(""),
  total_area_deeds: number().max(999999999).required(""),
  type_of_terrain: string().max(255).required(""),
  area: string().max(255).required(""),
  construction_area_owner: number().max(999999999).required(""),
  number_floors_property: number().max(999999999).required(""),
  electricity_meter_number: string().max(255).required(""),
  //paving
  sidewalk_condition: string().max(255).required(""),
  lineal_meters_property_facing_paved_street_north: number()
    .max(999999999)
    .required(""),
  lineal_meters_property_facing_paved_street_south: number()
    .max(999999999)
    .required(""),
  lineal_meters_property_facing_paved_street_east: number()
    .max(999999999)
    .required(""),
  lineal_meters_property_facing_paved_street_west: number()
    .max(999999999)
    .required(""),
  lineal_meters_property_facing_dirt_street_north: number()
    .max(999999999)
    .required(""),
  lineal_meters_property_facing_dirt_street_south: number()
    .max(999999999)
    .required(""),
  lineal_meters_property_facing_dirt_street_east: number()
    .max(999999999)
    .required(""),
  lineal_meters_property_facing_dirt_street_west: number()
    .max(999999999)
    .required(""),
  //streets
  type_street_property_sits: string().max(255).required(""),
  width_street_property_sits_north: number().max(999999999).required(""),
  width_street_property_sits_south: number().max(999999999).required(""),
  width_street_property_sits_east: number().max(999999999).required(""),
  width_street_property_sits_west: number().max(999999999).required(""),
  //property docs
  property_value_according_deeds: number().max(999999999).required(""),
  // property_owners_consent_appear_private_database_commercial_purposes: boolean;

  //OPTIONAL

  //services
  electricity: string().max(255),
  running_water: string().max(255),
  internet_service: string().max(255),
  mobil_data: string().max(255),
  road: string().max(255),
  comments: string().max(255),
  water_source: string().max(255),
  sewerage: string().max(255),
  electricity_provider: string().max(255),
  water_provider: string().max(255),
  internet_service_provider: string().max(255),
  mobil_data_provider: string().max(255),
  public_lights: string().max(255),
  trash_collection_service: string().max(255),
  street_cleaning_service: string().max(255),

  //taxes
  municipal_taxes: number().max(999999999),

  //weather
  weather: string().max(255),
  altitude: string().max(255),
  average_temperature: string().max(255),
  average_rainfall: string().max(255),

  //development
  developing_potential_property: string().max(255),
  agricultural_activity: string().max(255),
  type_of_agricultural_activity: string().max(255),
  type_of_animal_farming: string().max(255),
  annual_yielding: string().max(255),

  //safety
  property_risks: string().max(255),
  safety_level_area: string().max(255),

  //proximity
  proximity_education_centers: string().max(255),
  proximity_medical_centers: string().max(255),
  distance_main_city: string().max(255),
  distance_commercial_port: string().max(255),
  distance_airport: string().max(255),
  skilled_labor: string().max(255),
  unskilled_labor: string().max(255),

  //commercial
  type_commercial_activity_property: string().max(255),
  commercial_activity_property: string().max(255),
  owner_property_owner_business: string().max(255),
  business_owner_name: string().max(255),
  business_registered_municipal_record: string().max(255),

  //provisional
  total_area_property_according_national_registry: number().max(999999999),
  type_deeds: string().max(255),
  property_reference_according_national_registry: string().max(255),
  property_owners_email: string().max(255),
  parcel_number_national_registry: number().max(999999999),
  map_number_national_registry: number().max(999999999),
  mortgage_according_national_registry: string().max(255),
  legal_impediment_sale_according_national_registry: string().max(255),
  coworker: string().max(255),
  working_form_gather_info: string().max(255),
});
