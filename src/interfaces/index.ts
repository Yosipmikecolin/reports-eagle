export interface RequestTable {
  _id: string;
  answer: string;
  law: string;
  folio: number;
  issue_date: string;
  reason_return: string;
  description_reason: string;
  response_date: string;
  return_date: string;
  time_respond: string;
  status: string;
  carrier: FormDataCarrierPost;
  reason_revolution_requester: {
    description_reason: string;
    reason_return: string;
  }[];
  reason_revolution_awardee: {
    description_reason: string;
    reason_return: string;
  }[];
  awardee_response: {
    minimum_coverage: string;
    status: string;
    latitude: string;
    length: string;
    indication_aspects: string;
    value: string;
    photographic_evidence: string[];
  };
}

export interface FormDataCarrierPost {
  personalData: Step1Data;
  cause: Step2Data;
  monitoring: Step3Data;
  inclusionArea: Step4Data;
  exclusionArea: Step5Data;
}

export interface Step1Data {
  fullName: string;
  socialName: string;
  paternalSurname: string;
  sex: string;
  motherSurname: string;
  type_current: string;
  gender: string;
  dateBirth: string;
  maritalStatus: string;
  nationality: string;
  run: string;
  phone: string;
  foreigner: boolean;
}

export interface Step2Data {
  penatype: string;
  crs: string;
  crime: string;
  courtAppeals: string;
  courtRegion: string;
  court: string;
  ruc: string;
  rit: string;
  rol: string;
}

export interface Step3Data {
  crs: string;
  areas: string;
  durationMeasurement: string;
  controlSchedule: string;
  effectivePeriod: string;
  requestsFeasibility: string;
  judgment: string;
  programmingInstallation: string;
  installationsDone: string;
  modificationResolution: string;
  technicalSupports: string;
  nonReports: string;
  daysControl: string;
  uninstallations: string;
}

export interface Step4Data {
  street: string;
  number: string;
  additionalInformation: string;
  commune: string;
  region: string;
  road: string;
  population: string;
  zipCode: string;
  geographicCoordinates: string;
  radio: string;
  complianceSchedule: string;
  characteristics: string;
}

export interface Step5Data {
  street: string;
  number: string;
  additionalInformation: string;
  commune: string;
  region: string;
  road: string;
  population: string;
  zipCode: string;
  geographicCoordinates: string;
  radio: string;
  characteristics: string;
  paternalSurname: string;
  motherSurname: string;
  names: string;
  rut: string;
  complianceSchedule: string;
  victimEmail: string;
  homeTelephone: string;
  workplaceTelephone: string;
}
