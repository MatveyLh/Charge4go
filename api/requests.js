import {API_URL} from '../contants/constants';

export async function getStations() {
    try {
        const response = await fetch(`${API_URL}/default/stations/`);

        return await response.json();
    } catch (err) {
        return { success: false, error: err.message }
    }
}
