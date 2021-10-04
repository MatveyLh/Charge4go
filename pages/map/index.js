import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from 'react-google-maps';
import { getStations } from '../../api/requests';
import styles from './map.module.scss';
import { GOOGLE_KEY } from '../../contants/constants';
import Error from "../../components/Error/Error";

const defaultOptions = { scrollwheel: false };

const RegularMap = withScriptjs(
    withGoogleMap(({ stations }) => {
        const coordinates = stations ? stations?.map((stationItem) => {
            const [lat, lng] = stationItem?.groupLocation?.coordinates;

            return { lat, lng };
        }) : [];

        return (<GoogleMap
            defaultZoom={8}
            defaultCenter={coordinates[0]}
            defaultOptions={defaultOptions}
        >
            {coordinates?.map((coordinateItem, index) => <Marker position={coordinateItem} key={index} />)}

        </GoogleMap>);
    }),
);

function Map({ data }) {
    if (!data.success) {
        return <Error />
    }
    return (
        <RegularMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_KEY}`}
            loadingElement={<div className={styles.loading} />}
            containerElement={<div className={styles.container} />}
            mapElement={<div className={styles.map} />}
            stations={data?.data?.stations}
        />
    );
}

Map.getInitialProps = async () => {
    const data = await getStations();

    return { data };
};

export default Map;
