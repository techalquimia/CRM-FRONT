import { useCallback } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import PropTypes from "prop-types";
import { CONFIG } from "../../constants/config.js";
import { useGoogleMaps } from "../../hooks/useGoogleMaps.js";
import MapErrorMessage from "./MapErrorMessage.jsx";
import LoadingOverlay from "../ui/LoadingOverlay.jsx";

const UnitMapView = ({ unit }) => {
  const {
    apiKey,
    isApiKeyValid,
    getApiKeyErrorMessage,
    mapOptions,
    truckIcon,
    mapError,
    isMapLoading,
    handleLoadError,
    handleScriptLoad,
    handleMapLoad,
  } = useGoogleMaps({ mapType: "detail" });

  const onMapLoad = useCallback(
    (map) => {
      handleMapLoad(map, {
        center: unit.position,
        zoom: CONFIG.GOOGLE_MAPS.DETAIL_ZOOM,
      });
    },
    [unit.position, handleMapLoad]
  );

  if (!isApiKeyValid) {
    return (
      <MapErrorMessage
        message={getApiKeyErrorMessage()}
        type="info"
      />
    );
  }

  if (mapError) {
    return <MapErrorMessage message={mapError} type="error" />;
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {isMapLoading && (
        <LoadingOverlay message="Cargando mapa..." fullScreen={false} />
      )}
      <LoadScript
        googleMapsApiKey={apiKey}
        onError={handleLoadError}
        onLoad={handleScriptLoad}
      >
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "100%",
            borderRadius: "16px",
          }}
          center={unit.position}
          zoom={CONFIG.GOOGLE_MAPS.DETAIL_ZOOM}
          options={mapOptions}
          onLoad={onMapLoad}
        >
          <Marker
            position={unit.position}
            title={`${unit.name} - ${unit.status}`}
            label={{
              text: unit.name,
              color: "#2F6FED",
              fontWeight: "bold",
              fontSize: "14px",
            }}
            icon={truckIcon}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

UnitMapView.propTypes = {
  unit: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    position: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default UnitMapView;

