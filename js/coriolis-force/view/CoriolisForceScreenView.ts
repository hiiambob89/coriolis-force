// Copyright 2024, University of Colorado Boulder

/**
 * TODO Describe this class and its responsibilities.
 *
 * @author Kaden Hart
 */

import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import CoriolisForceConstants from '../../common/CoriolisForceConstants.js';
import coriolisForce from '../../coriolisForce.js';
import CoriolisForceModel from '../model/CoriolisForceModel.js';
import optionize from '../../../../phet-core/js/optionize.js';

type SelfOptions = {
 //TODO add options that are specific to CoriolisForceScreenView here
};

type CoriolisForceScreenViewOptions = SelfOptions & ScreenViewOptions;

export default class CoriolisForceScreenView extends ScreenView {
  domNode: any;
  puck: import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").Mesh<import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").SphereGeometry, import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").MeshBasicMaterial>;

  public constructor( model: CoriolisForceModel, providedOptions: CoriolisForceScreenViewOptions ) {

    const options = optionize<CoriolisForceScreenViewOptions, SelfOptions, ScreenViewOptions>()( {

      //TODO add default values for optional SelfOptions here

      //TODO add default values for optional ScreenViewOptions here
    }, providedOptions );

    super( options );

    const resetAllButton = new ResetAllButton( {
      listener: () => {
        this.interruptSubtreeInput(); // cancel interactions that may be in progress
        model.reset();
        this.reset();
      },
      right: this.layoutBounds.maxX - CoriolisForceConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.layoutBounds.maxY - CoriolisForceConstants.SCREEN_VIEW_Y_MARGIN,
      tandem: options.tandem.createTandem( 'resetAllButton' )
    } );
    this.addChild( resetAllButton );

    const rootNode = new phet.scenery.Node();
    const display = new phet.scenery.Display(rootNode);
    document.body.appendChild(display.domElement);

    // set up a scene with three.js
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-this.layoutBounds.maxX/2,this.layoutBounds.maxX/2,-this.layoutBounds.maxY/2,this.layoutBounds.maxY/2);
    camera.position.set(0, 0, 0)
    camera.position.z = 1;
    const puckGeometry = new THREE.SphereGeometry(200, 32, 32);
    const puckMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, depthTest: true });
    var iceMaterial = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load('/coriolis-force/js/coriolis-force/view/6465863.jpg'),
      transparent: true,
      alphaTest: 0.5,
      side: THREE.DoubleSide
    });
    const puck = new THREE.Mesh(puckGeometry, iceMaterial);
    this.puck = puck;
    

    scene.add(puck);
    // Get the size (length, width, and height) of the bounding box

    var renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    renderer.setClearColor(0x000000, 0);
    renderer.setClearAlpha(0);
    renderer.setSize(this.layoutBounds.maxX, this.layoutBounds.maxY);
    document.body.appendChild(renderer.domElement);

    const domNode = new phet.scenery.DOM(renderer.domElement);
    this.domNode = domNode;
    
    this.domNode._container.style.position = ""
    this.addChild(domNode);
    display.updateOnRequestAnimationFrame(() => {
      renderer.render(scene, camera);
    });
  }

  /**
   * Resets the view.
   */
  public reset(): void {
    //TODO
  }

  /**
   * Steps the view.
   * @param dt - time step, in seconds
   */
  public override step( dt: number ): void {
    this.puck.rotateZ(dt);
  }
}

coriolisForce.register( 'CoriolisForceScreenView', CoriolisForceScreenView );