import { useEffect, useRef, useState } from "react";
import getObservation from "../../services/api-service/api-service";
import styles from './HomePage.module.css';

interface Item {
    id: string;
    status: string;
    code: string;
}

function HomePage() {
    const hasFetched = useRef(false);
    
    const [isLoading, setLoading] = useState<boolean>(false);
    const [observationData, setObservationData] = useState<Item[]>();

    useEffect(() => {
        if (hasFetched.current) {
            return;
        }
        hasFetched.current = true;
        fetchObservations();
        
    }, []);

    useEffect(() => {
        console.log('observations: ', observationData);
    }, [observationData]);

    async function fetchObservations() {
        try {
            setLoading(true);
            const rawObservations: any[] = [];
            for (let i = 1; i <= 4; i++) {
                const response = await getObservation(String(i));
                rawObservations.push(response);
                    // .then((data) => raw_observations.push(data))
                    // .catch((error) => console.log(error));
            }

            const mapped: Item[] = rawObservations.map((value) => ({
                id: value.subject.reference,
                status: value.status,
                code: value.code.coding[0].code
            }));
            setObservationData(mapped);
        } catch (error) {
            throw new Error('unexpected error: ');
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
                <input placeholder="Enter id"></input>
                <input placeholder="Enter status"></input>
                <input placeholder="Enter code"></input>
            </div>
            <div>
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