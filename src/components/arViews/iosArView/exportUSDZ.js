import { USDZExporter } from "./USDZExporter/USDZExporter";

export async function exportUSDZ(mesh) {
  const model = mesh.clone();
//   model.scale.set(0.5, 0.5, 0.5);
  // model.traverse((obj => {
  //   if (obj.isMesh) {
  //     const prevMaterial = obj.material.clone();
  //     obj.material = new MeshStandardMaterial();
  //     for (const prop of Object.keys(obj.material)) {
  //       if (prevMaterial[prop]) {
  //         obj.material[prop] = prevMaterial[prop];
  //       }
  //     }
  //     if (obj.material.alphaMap) {
  //       obj.material.map = new TextureLoader().load(window.location.origin + '/assets/images/backrestAlpha.png')
  //       obj.material.alphaMap = null;
  //       obj.material.transparent = true;
  //     }
  //     if (obj.name === 'metal' || obj.name === 'matal') {
  //       obj.material.map = null;
  //       obj.material.roughness = 0.5;
  //     }
  //     obj.material.side = FrontSide;
  //     obj.material.metalness = 1;
  //   }
  // }))

  model.updateMatrix();
	model.updateMatrixWorld();



  const exporter = new USDZExporter();
  const arraybuffer = await exporter.parse( model );
  const blob = new Blob( [ arraybuffer ], { type: 'application/octet-stream' } );

  return URL.createObjectURL( blob );
}
