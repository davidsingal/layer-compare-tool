'use client';

import { useCallback } from 'react';
import { useAtom } from 'jotai';
import { XIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { leftLayersAtom, rightLayersAtom } from '@/store/layers';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ActiveLayers: React.FC<{ position: 'right' | 'left' }> = ({ position }) => {
  const [layers, setLayers] = useAtom(position === 'left' ? leftLayersAtom : rightLayersAtom);

  const handleRemoveLayer = useCallback(
    (id: string) => {
      setLayers((prev) => prev.filter((layer) => layer.id !== id));
    },
    [setLayers],
  );

  return (
    <div className={cn('absolute top-4', position === 'left' ? 'left-4' : 'right-4')}>
      {layers.length > 0 && (
        <ul className="space-y-1">
          {layers.map((layer) => (
            <li
              key={layer.id}
              className="flex items-center justify-between gap-1 rounded-md border bg-background p-1"
            >
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="uppercase">
                  {layer.service}
                </Badge>
                <h3 className="text-sm font-semibold">{layer.id}</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 shrink-0 grow-0 rounded-full p-0"
                onClick={handleRemoveLayer.bind(null, layer.id)}
              >
                <XIcon className="h-3 w-3" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActiveLayers;
