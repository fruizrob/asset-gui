"use client"; // This is a client component 👈🏽

import React from 'react';
import { trpc } from '../../../utils/trpc';
import Graphin, { Behaviors, GraphinData, IUserEdge, IUserNode, Utils } from '@antv/graphin';


const getColor = (type: string) => {
  switch (type) {
    case 'ip':
      return '#ff6a00';
    case 'fqdn':
      return '#9254de';
    case 'netblock':
      return '#00d084';
    case 'as':
      return '#2f54eb';
    case 'rirorg':
      return '#ffc53d';
    default:
      return '#000000';
  }
}

const buildGraph = (assets: any, relations: any): GraphinData => {
  const nodes: IUserNode[] = assets.data.map((asset: any) => {

    return {
      id: asset.id.toString(),
      style: {
        label: {
          value: asset.content.name || asset.content.address || asset.content.cidr || asset.content.number,
        },
        keyshape: {
          size: 30,
          stroke: getColor(asset.type),
          fill: getColor(asset.type),
          fillOpacity: 0.2,
          strokeOpacity: 1
        },
      }
    }
  });

  const edges: IUserEdge[] = relations.data.map((relation: any) => {
    return {
      source: relation.from_asset_id.toString(),
      target: relation.to_asset_id.toString(),
      style: {
        label: {
          value: relation.type,
        },
        keyshape: {
          lineDash: [2,2],
        },
      }
    }
  });

  return {
    nodes,
    edges,
  }
}

export default function Page() {
  const assets = trpc.asset.list.useQuery();
  const relations = trpc.relation.list.useQuery();

  if (assets.isLoading || relations.isLoading) {
    return (
      <div style={styles}>
        <h1>Loading...</h1>
      </div>
    );
  }



  const { ZoomCanvas, ActivateRelations, TreeCollapse } = Behaviors;
  return (
    <div style={styles}>
      <Graphin
        data={buildGraph(assets, relations)}
        layout={{
          type: 'graphin-force',
          preset: {
            type: 'concentric',
          },
          animation: false,
          defSpringLen: () => 200,
        }}
      >
        <ZoomCanvas disabled />
      </Graphin>
    </div>
  )
}

const styles = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
