import { DownOutlined, UpOutlined } from '@ant-design/icons';

interface LayerItem {
  id: string;
  title: string;
  source: string;
}

interface Props {
  title: string;
  layers: LayerItem[];
  open: boolean;
  toggle: () => void;
  activeLayers: string[];
  onToggleLayer: (id: string) => void;
}

const MapsetGroup = ({
  title,
  layers,
  open,
  toggle,
  activeLayers,
  onToggleLayer,
}: Props) => {
  return (
    <div className="mapset-group">
      <button 
        className={`mapset-group-title ${open ? 'open' : ''}`}
        onClick={toggle}
    >
        <span className='mapset-group-label'>{title}</span>
        <span className="mapset-group-icon">
            {open ? <UpOutlined /> : <DownOutlined />}
        </span>
      </button>

      {open &&
        layers.map((l) => (
            <label key = {l.id} className="mapset-item">
                <div className="mapset-left">
                    <img src="/icon_mapset.png" alt="" className="mapset-icon" />

                    <div className="mapset-text">
                    <strong>{l.title}</strong>
                    <span>{l.source}</span>
                    </div>
                </div>

                <input
                    type="checkbox"
                    checked={activeLayers.includes(l.id)}
                    onChange={() => onToggleLayer(l.id)}
                />
            </label>

        ))}
    </div>
  );
};

export default MapsetGroup;
