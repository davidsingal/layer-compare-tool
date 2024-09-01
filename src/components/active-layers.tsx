'use client';

import { useCallback } from 'react';
import { useAtom } from 'jotai';
import { XIcon } from 'lucide-react';

import layersAtom from '@/store/layers';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ActiveLayers: React.FC = () => {
  const [layers, setLayers] = useAtom(layersAtom);

  const handleRemoveLayer = useCallback(
    (id: string) => {
      setLayers((prev) => prev.filter((layer) => layer.id !== id));
    },
    [setLayers],
  );

  return (
    <div className="p-6">
      <ul className="space-y-2">
        {layers.map((layer) => (
          <li
            key={layer.id}
            className="flex items-center justify-between gap-2 rounded-sm border p-2"
          >
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="uppercase">
                {layer.service}
              </Badge>
              <h3 className="text-sm font-semibold">{layer.id}</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="shrink-0 grow-0"
              onClick={handleRemoveLayer.bind(null, layer.id)}
            >
              <XIcon className="h-3 w-3" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActiveLayers;
