import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { MOCK_UNITS } from "../../data/mockUnits.js";
import { CONFIG } from "../../constants/config.js";
import { ROUTES } from "../../constants/routes.js";
import { calculateMapCenter } from "../../utils/mapUtils.js";
import { useGoogleMaps } from "../../hooks/useGoogleMaps.js";
import MapErrorMessage from "./MapErrorMessage.jsx";
import LoadingOverlay from "../ui/LoadingOverlay.jsx";

const GoogleMapView = () => {
  const navigate = useNavigate();
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
  } = useGoogleMaps({ mapType: "default" });

  const mapCenter = useMemo(
    () => calculateMapCenter(MOCK_UNITS.map((u) => u.position)),
    []
  );

  const handleMarkerClick = useCallback(
    (unitId) => {
      navigate(ROUTES.UNIT_DETAIL(unitId));
    },
    [navigate]
  );

  const onMapLoad = useCallback(
    (map) => {
      handleMapLoad(map, {
        fitBounds: MOCK_UNITS.map((u) => u.position),
      });
    },
    [handleMapLoad]
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
    <div style={{ position: "relative", width: "100%", height: "400px" }}>
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
            height: "400px",
            borderRadius: "16px",
          }}
          center={mapCenter}
          zoom={CONFIG.GOOGLE_MAPS.DEFAULT_ZOOM}
          options={mapOptions}
          onLoad={onMapLoad}
        >
          {MOCK_UNITS.map((unit) => (
            <Marker
              key={unit.id}
              position={unit.position}
              title={`${unit.name} - ${unit.status}`}
              label={{
                text: unit.name,
                color: "#2F6FED",
                fontWeight: "bold",
                fontSize: "12px",
              }}
              icon={truckIcon}
              onClick={() => handleMarkerClick(unit.id)}
              cursor="pointer"
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GoogleMapView;

