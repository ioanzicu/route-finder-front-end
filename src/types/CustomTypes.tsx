export interface ICoordinates {
  longitude: string;
  latitude: string;
  locationLabel: string;
  country: string;
  state: string;
  city: string;
  street?: string;
  houseNumber?: string;
  postalCode: string;
}

export interface IGeocode {
  Response: IResponse;
}

export interface IResponse {
  MetaInfo: IMetaInfo;
  View: IView[];
}

export interface IMetaInfo {
  Timestamp: string;
}

export interface IView {
  _type: string;
  ViewId: number;
  Result: IResult[];
}

export interface IResult {
  Relevance: number;
  MatchLevel: string;
  MatchQuality: IMatchQuality;
  Location: ILocation;
}

export interface ILocation {
  LocationId: string;
  LocationType: string;
  DisplayPosition: IDisplayPosition;
  NavigationPosition: IDisplayPosition[];
  MapView: IMapView;
  Address: IAddress;
}

export interface IAddress {
  Label: string;
  Country: string;
  State: string;
  County: string;
  City: string;
  Street?: string;
  HouseNumber?: string;
  PostalCode: string;
  AdditionalData: IAdditionalDatum[];
}

export interface IAdditionalDatum {
  value: string;
  key: string;
}

export interface IDisplayPosition {
  Latitude: number;
  Longitude: number;
}

export interface IMapView {
  TopLeft: IDisplayPosition;
  BottomRight: IDisplayPosition;
}

export interface IMatchQuality {
  City: number;
}

export interface IRoute {
  destination: string;
  duration: string;
  distance: string;
}

export interface IData {
  source: string;
  routes: IRoute[];
}

export interface InputList {
  latitude: string;
  longitude: string;
}
