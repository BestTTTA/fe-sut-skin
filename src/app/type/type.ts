export interface NewPatientRequest {
    patient_id: string;
    gender: string;
    age: number;
    treatment: string;
    medicines_treatment: string;
    diseases_monitored: string;
    diseases_id: number;
    side_effects: string;
    image_skin: string;
    skin_predicted: string;
    date: string;
  }
  