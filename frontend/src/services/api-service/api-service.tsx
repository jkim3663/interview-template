import { api } from "../../adapter/api";

const observationPath: string = 'observation/';


function getObservation(observationId: string): Promise<Response> {
    const endpoint: string = observationPath + observationId;
    return api.get(endpoint).then((response) => response.json());
}

export default getObservation;