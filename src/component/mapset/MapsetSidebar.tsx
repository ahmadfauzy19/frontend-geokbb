import { useState } from 'react';
import { MAPSET_LAYERS } from '../../config/MapsetLayers';
import MapsetGroup from './MapsetGroup';

interface Props {
  activeLayers: string[];
  toggleLayer: (id: string) => void;
}

const MapsetSidebar = ({ activeLayers, toggleLayer }: Props) => {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    lingkungan: false,
    transportasi: false,
    kelistrikan: false,
    sumberDayaAir: false,
  });

  const toggleGroup = (key: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <section className="panel">
      {activeLayers.length === 0 && (
        <>
          <h4>Mapset</h4>
          <p className="muted">Belum ada mapset yang dipilih</p>
        </>
      )}

      {Object.entries(MAPSET_LAYERS).map(([key, group]) => (
        <MapsetGroup
          key={key}
          title={group.label}
          layers={group.layers}
          open={openGroups[key]}
          toggle={() => toggleGroup(key)}
          activeLayers={activeLayers}
          onToggleLayer={toggleLayer}
        />
      ))}
    </section>
  );
};

export default MapsetSidebar;
