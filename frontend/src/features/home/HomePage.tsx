import { useEffect, useRef, useState } from "react";
import {getObservation, postObservation} from "../../services/api-service/api-service";
import styles from './HomePage.module.css';
import Button from "../../components/button/Button";

interface Item {
    id: string;
    status: string;
    code: string;
}

function HomePage() {
    const hasFetched = useRef(false);
    
    const [isLoading, setLoading] = useState<boolean>(false);
    const [observationData, setObservationData] = useState<Item[]>();
    const [refreshData, setRefreshData] = useState<boolean>(false);

    const [id, setId] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [code, setCode] = useState<string>('');

    useEffect(() => {
        if (hasFetched.current) {
            return;
        }
        hasFetched.current = true;
        fetchObservations();
        
    }, []);

    useEffect(() => {
        if (hasFetched.current) {
            return;
        }
        hasFetched.current = true;
        fetchObservations();
    }, [refreshData]);

    async function fetchObservations() {
        try {
            setLoading(true);
            const rawObservations: any[] = [];
            for (let i = 1; i <= 4; i++) {
                const response = await getObservation(String(i));
                rawObservations.push(response);
            }

            const mapped: Item[] = rawObservations.map((value) => ({
                id: value.subject.reference,
                status: value.status,
                code: value.code.coding[0].code
            }));
            setObservationData(mapped);
            setRefreshData(false);
        } catch (error) {
            setLoading(false);
            throw new Error('unexpected error: ');
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit() { 
        if (id.length <= 0 || status.length <= 0 || code.length <= 0) {
            // do not post request without all three fields valid.
            return;
        }
        const requestBody = {
            id: id,
            status: status,
            code: code
        };
        try {
            hasFetched.current = false;
            setLoading(true);
            const resp = await postObservation(requestBody);
            setRefreshData(true);
        } catch (error) {
            setLoading(false);
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className={styles.homePageContainer}>
            <div className={styles.createObservation}>
                <div>
                    Create a new observation
                </div>
                <input placeholder="Enter id" onChange={(e) => setId(e.target.value)}></input>
                <input placeholder="Enter status" onChange={(e) => setStatus(e.target.value)}></input>
                <input placeholder="Enter code" onChange={(e) => setCode(e.target.value)}></input>
                <Button onClick={handleSubmit}>Submit Observation</Button>
            </div>
            <div className={styles.observationTable}>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Status</th>
                            <th>Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                                <tr key='-1'>
                                    <td>data is loading</td>
                                </tr>
                            ) : 
                            ( 
                                observationData?.map((value: Item, idx: number) => (
                                    <tr key={idx}>
                                        <td>{value.id}</td>
                                        <td>{value.status}</td>
                                        <td>{value.code}</td>
                                    </tr>
                                ))
                            )
                        }
                    </tbody>
                </table> 
            </div>
        </div>
    );
}

export default HomePage;