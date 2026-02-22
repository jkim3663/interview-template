import { api } from "../../adapter/api";

const observationPath: string = 'observations';


export function getObservation(observationId: string): Promise<Response> {
    const endpoint: string = observationPath + '/' + observationId;
    return api.get(endpoint).then((response) => response.json());
}

export function postObservation(requestBody: object) {
    const endpoint: string = observationPath;
    return api.post(endpoint, requestBody).then((response) => response.json());
}

// TODO: implement put, patch, delete
