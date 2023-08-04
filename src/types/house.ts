export interface Houses {
  //REQUIRED

  //main
  id: string;
  state: string;
  town: string;
  latitude: number;
  longitude: number;
  property_address_national_registry: string;
  property_address_record: string;
  property_picture: string;
  //ids
  owners_id: string;
  property_id_number_national_registry: string;
  cadastral_id_number_from_national_registry: string;
  id_number_municipal_record: number;
  sequential_number_record: string;
  volume: string;
  sheet: string;
  //owner
  property_owners_according_deeds_municipal_records: string;
  property_owners_phone_number: string;
  owners_name_national_registry: string;
  name_on_file_municipal_taxes: string;
  municipal_taxes_account_number: string;
  //construction
  type_of_property: string;
  total_area_deeds: number;
  type_of_terrain: string;
  area: string;
  construction_area_owner: number;
  number_floors_property: number;
  electricity_meter_number: string;
  //paving
  sidewalk_condition: string;
  lineal_meters_property_facing_paved_street_north: number;
  lineal_meters_property_facing_paved_street_south: number;
  lineal_meters_property_facing_paved_street_east: number;
  lineal_meters_property_facing_paved_street_west: number;
  lineal_meters_property_facing_dirt_street_north: number;
  lineal_meters_property_facing_dirt_street_south: number;
  lineal_meters_property_facing_dirt_street_east: number;
  lineal_meters_property_facing_dirt_street_west: number;
  //streets
  type_street_property_sits: string;
  width_street_property_sits_north: number;
  width_street_property_sits_south: number;
  width_street_property_sits_east: number;
  width_street_property_sits_west: number;
  //property docs
  property_value_according_deeds: number;
  // property_owners_consent_appear_private_database_commercial_purposes: boolean;

  //OPTIONAL

  //services
  electricity?: string;
  running_water?: string;
  internet_service?: string;
  mobil_data?: string;
  road?: string;
  comments?: string;
  water_source?: string;
  sewerage?: string;
  electricity_provider?: string;
  water_provider?: string;
  internet_service_provider?: string;
  mobil_data_provider?: string;
  public_lights?: string;
  trash_collection_service?: string;
  street_cleaning_service?: string;

  //taxes
  municipal_taxes?: number;

  //weather
  weather?: string;
  altitude?: string;
  average_temperature?: string;
  average_rainfall?: string;

  //development
  developing_potential_property?: string;
  agricultural_activity?: string;
  type_of_agricultural_activity?: string;
  type_of_animal_farming?: string;
  annual_yielding?: string;

  //safety
  property_risks?: string;
  safety_level_area?: string;

  //proximity
  proximity_education_centers?: string;
  proximity_medical_centers?: string;
  distance_main_city?: string;
  distance_commercial_port?: string;
  distance_airport?: string;
  skilled_labor?: string;
  unskilled_labor?: string;

  //commercial
  type_commercial_activity_property?: string;
  commercial_activity_property?: string;
  owner_property_owner_business?: string;
  business_owner_name?: string;
  business_registered_municipal_record?: string;

  //provisional
  total_area_property_according_national_registry?: number;
  type_deeds?: string;
  property_reference_according_national_registry?: string;
  property_owners_email?: string;
  parcel_number_national_registry?: number;
  map_number_national_registry?: number;
  mortgage_according_national_registry?: string;
  legal_impediment_sale_according_national_registry?: string;
  coworker?: string;
  working_form_gather_info?: string;
  //created
  createdAt?: number | null;
  updatedAt?: number | null;
}
