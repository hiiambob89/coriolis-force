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
import Panel from '../../../../sun/js/Panel.js';
import { Color, HBox, Rectangle, RichText, VBox } from '../../../../scenery/js/imports.js';
import Property from '../../../../axon/js/Property.js';
import HSlider from '../../../../sun/js/HSlider.js';
import Range from '../../../../dot/js/Range.js';
import RoundToggleButton from '../../../../sun/js/buttons/RoundToggleButton.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';


type SelfOptions = {
 //TODO add options that are specific to CoriolisForceScreenView here
};

type CoriolisForceScreenViewOptions = SelfOptions & ScreenViewOptions;

export default class CoriolisForceScreenView extends ScreenView {
  domNode: any;
  disk: import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").Mesh<import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").SphereGeometry, import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").MeshBasicMaterial>;
  model: CoriolisForceModel;
  puckI: import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").Mesh<import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").SphereGeometry, import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").MeshBasicMaterial>;
  puckRef: import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").Mesh<import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").SphereGeometry, import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").MeshBasicMaterial>;
  diskRef: import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").Mesh<import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").SphereGeometry, import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").MeshBasicMaterial>;
  iOffset: number;
  refOffset: number;
  pathRefRef: import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").Path;
  lineRefRef: import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").Line<import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").BufferGeometry, import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").LineBasicMaterial>;
  pathIRef: import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").Path;
  lineIRef: import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").Line<import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").BufferGeometry, import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").LineBasicMaterial>;
  scene: import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").Scene;

  public constructor( model: CoriolisForceModel, providedOptions: CoriolisForceScreenViewOptions ) {

    const options = optionize<CoriolisForceScreenViewOptions, SelfOptions, ScreenViewOptions>()( {

      //TODO add default values for optional SelfOptions here

      //TODO add default values for optional ScreenViewOptions here
    }, providedOptions );

    super( options );

    this.layoutBounds.maxX = 1400

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

    const buttonMass = new Property<boolean>(false);
    const buttonFriction = new Property<boolean>(false);
    const buttonV_x = new Property<boolean>(false);
    const buttonV_y = new Property<boolean>(false);
    const buttonX =  new Property<boolean>(false);
    const buttonY =  new Property<boolean>(false);
    const buttonOmega =  new Property<boolean>(false);

    const simSpeedSlider = new HSlider(model.simSpeedProp, new Range(0, Number(3)), { helpText: 'Simulation Speed' });
    const panelSizer = new Rectangle(10, 10, 200, 30);
    const sliderGap = new Rectangle(0, 0, 0, 10);

    const massSlider = new HSlider(model.massProp, new Range(0, 10));
    const mass = new RichText("m");
    const k = new RichText("<em>k</em>");
    const x = new RichText("<em>x<sub>0</sub></em>")
    const y = new RichText("<em>y<sub>0</sub></em>")
    const v_x = new RichText("<em>v<sub>0x</sub></em>");
    const v_y = new RichText("<em>v<sub>0y</sub></em>");
    const omega = new RichText("<em>ω</em>")

    const constantNames = new VBox({
      align: "left", children: [
        mass,
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 7),
        k,
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 7),
        x,
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 7),
        y,
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 7),
        v_x,
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 7),
        v_y,
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 7),
        omega
      ]
    })
    console.log("YYYYPROP",model.yProp.value)

    const constantSliders = new VBox({
      align: "center", children: [
        massSlider,
        new Rectangle(0, 0, 0, 10),
        new HSlider(model.kProp, new Range(0, 10)),
        new Rectangle(0, 0, 0, 10),
        new HSlider(model.xProp, new Range(0, 200)),
        new Rectangle(0, 0, 0, 10),
        new HSlider(model.yProp, new Range(0, 200)),
        new Rectangle(0, 0, 0, 10),
        new HSlider(model.v_xProp, new Range(0, 200)),
        new Rectangle(0, 0, 0, 10),
        new HSlider(model.v_yProp, new Range(0, 200)),
        new Rectangle(0, 0, 0, 10),
        new HSlider(model.omegaProp, new Range(0, 10)),
      ]
    })
    model.yProp.value= model.y;
    console.log("YYYYPROP",model.yProp.value)
    
    var toggleRadius = 11;
    const buttonVBoxConstants = new VBox({
      children: [
        // new Rectangle(0, 0, 0, massSlider.height - mass.height),
        new RoundToggleButton(buttonMass, false, true, { radius: toggleRadius }),
        new RichText('✎'),

        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new RoundToggleButton(buttonFriction, false, true, { radius: toggleRadius }),
        new RichText('✎'),

        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new RoundToggleButton(buttonX, false, true, { radius: toggleRadius }),
        new RichText('✎'),

        new Rectangle(0, 0, 0, simSpeedSlider.height - mass.height + sliderGap.height),
        new RoundToggleButton(buttonY, false, true, { radius: toggleRadius }),
        new RichText('✎'),

        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new RoundToggleButton(buttonV_x, false, true, { radius: toggleRadius }),
        new RichText('✎'),

        new Rectangle(0, 0, 0, simSpeedSlider.height - mass.height + sliderGap.height),
        new RoundToggleButton(buttonV_y, false, true, { radius: toggleRadius }),
        new RichText('✎'),
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new RoundToggleButton(buttonOmega, false, true, { radius: toggleRadius }),
        new RichText('✎'),


      ]
    })
    
    const constantMeasure = new VBox({
      align: "left", children: [
        new Rectangle(0, 0, 50, 0),
        new phet.scenery.Text(new DerivedProperty([model.massProp], (value) => { return String(Number(value).toFixed(2)) }), { fontSize: 20 }),
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new phet.scenery.Text(new DerivedProperty([model.kProp], (value) => { return String(Number(value).toFixed(2)) }), { fontSize: 20 }),
        
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new phet.scenery.Text(new DerivedProperty([model.xProp], (value) => { return String(Number(value).toFixed(2)) }), { fontSize: 20 }),
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new phet.scenery.Text(new DerivedProperty([model.yProp], (value) => { return String(Number(value).toFixed(2)) }), { fontSize: 20 }),
  
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new phet.scenery.Text(new DerivedProperty([model.v_xProp], (value) => { return String(Number(value).toFixed(2)) }), { fontSize: 20 }),
        // new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new phet.scenery.Text(new DerivedProperty([model.v_yProp], (value) => { return String(Number(value).toFixed(2)) }), { fontSize: 20 }),
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new phet.scenery.Text(new DerivedProperty([model.omegaProp], (value) => { return String(Number(value).toFixed(2)) }), { fontSize: 20 }),
      ]
    })
    
    const measureText = new VBox({
      align: "left", children: [
        // new RichText("<span style='font-family: Roman;'>kg</span>"),
        // new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new RichText("<span style='font-family: Roman;'>kg</span>"),
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new RichText("<span style='font-family: Roman;'>1/m</span>"),
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new RichText("<span style='font-family: Roman;'></span>"),
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new RichText("<span style='font-family: Roman;'></span>"),
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new RichText("<span style='font-family: Roman;'>m/s</span>"),
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new RichText("<span style='font-family: Roman;'>m/s</span>"),
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new RichText("<span style='font-family: Roman;'>rot/s</span>"),
      ]
    })
    const constantPanel = new Panel(new VBox({
      align: "center", children: [new RichText("Constants"), new Rectangle(0, 0, 350, 15), new HBox({
        align: "center", children: [
          constantNames,
          new Rectangle(0, 0, 10, 0),
          constantSliders,
          new Rectangle(0, 0, 10, 0),
          buttonVBoxConstants,
          new Rectangle(0, 0, 10, 0),
          constantMeasure,
          new Rectangle(0, 0, 10, 0),
          measureText
        ]
      })]
    }), { fill: new Color("#d3d3d3"), maxWidth: 230 })

    const speedPanel = new Panel(new VBox({
      align: "center", children: [new RichText("Components"), new Rectangle(0, 0, 350, 15), new HBox({
        align: "center", children: [
          new RichText('simSpeed'),simSpeedSlider, new phet.scenery.Text(new DerivedProperty([model.simSpeedProp], (value) => { return String(Number(value).toFixed(2)) }), { fontSize: 20 })
        ]
      })]
    }), { fill: new Color("#d3d3d3"), maxWidth: 230 })
    this.addChild(speedPanel);
    speedPanel.leftTop = new Vector2(constantPanel.leftBottom.x,constantPanel.leftBottom.y+5)
    model.simSpeedProp.link((val)=>model.simSpeed=val)
    this.addChild(constantPanel);

    buttonMass.lazyLink(() => { model.massProp.value = Number(window.prompt("Enter value for mass:")); this.reset(); })
    buttonFriction.lazyLink(() => { model.kProp.value = Number(window.prompt("Enter value for k:")); this.reset(); })
    buttonX.lazyLink(() => { model.xProp.value = Number(window.prompt("Enter value for x:")); this.reset(); })
    buttonY.lazyLink(() => { model.yProp.value = Number(window.prompt("Enter value for y:")); this.reset(); })
    buttonV_x.lazyLink(() => { model.v_xProp.value = Number(window.prompt("Enter value for v_x:")); this.reset(); })
    buttonV_y.lazyLink(() => { model.v_yProp.value = Number(window.prompt("Enter value for v_y:")); this.reset(); })
    buttonOmega.lazyLink(() => { model.omegaProp.value = Number(window.prompt("Enter value for ω:")); this.reset(); })

    window.addEventListener("keypress", (event) => {
      if (event.key == "r"){
        this.reset()
      }
    })

    this.model = model;
    this.addChild( resetAllButton );
    this.iOffset = -200;
    this.refOffset = 200;

    const rootNode = new phet.scenery.Node();
    const display = new phet.scenery.Display(rootNode);
    document.body.appendChild(display.domElement);

    // set up a scene with three.js
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-this.layoutBounds.maxX/2,this.layoutBounds.maxX/2,-this.layoutBounds.maxY/2,this.layoutBounds.maxY/2);
    camera.position.set(0, 0, 0)
    camera.position.z = 1;
    const diskGeometry = new THREE.SphereGeometry(200, 32, 32);
    var iceMaterial = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load('/coriolis-force/js/coriolis-force/view/6465863.jpg'),
      transparent: true,
      alphaTest: 0.5,
      side: THREE.DoubleSide
    });
    const disk = new THREE.Mesh(diskGeometry, iceMaterial);
    this.disk = disk;
    scene.add(disk);
    disk.position.set(this.iOffset,0,0);





    const puckGeometry = new THREE.SphereGeometry(10, 32, 32);
    const puckMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, depthTest: true });
    const puckI = new THREE.Mesh(puckGeometry, puckMaterial);
    this.puckI = puckI;
    scene.add(puckI)
    puckI.position.set(this.iOffset+this.model.x,this.model.y,0)
    
    const puckRef = new THREE.Mesh(puckGeometry, puckMaterial);
    this.puckRef = puckRef;
    scene.add(puckRef)
    puckRef.position.set(this.refOffset+this.model.x,this.model.y,0)

    const diskRef = new THREE.Mesh(diskGeometry, iceMaterial);
    this.diskRef = diskRef;
    scene.add(diskRef);
    diskRef.position.set(this.refOffset,0,0)

    

    this.pathRefRef = new THREE.Path();
    this.pathRefRef.currentPoint = new THREE.Vector2(puckRef.position.x, puckRef.position.y)
  
    const points = [new THREE.Vector2(puckRef.position.x, puckRef.position.y)];
  
    const geometryPath = new THREE.BufferGeometry().setFromPoints( points );
    const materialPath = new THREE.LineBasicMaterial( { color: 0xff0000, transparent: true } );
  
    this.lineRefRef = new THREE.Line( geometryPath, materialPath );
    
    scene.add( this.lineRefRef );

    this.pathIRef = new THREE.Path();
    this.pathIRef.currentPoint = new THREE.Vector2(puckI.position.x, puckI.position.y)
  
    const pointsI = [new THREE.Vector2(puckI.position.x, puckI.position.y)];
  
    const geometryPathI = new THREE.BufferGeometry().setFromPoints( pointsI );
    const materialPathI = new THREE.LineBasicMaterial( { color: 0xff0000, transparent: true } );
  
    this.lineIRef = new THREE.Line( geometryPathI, materialPathI );
    
    scene.add( this.lineIRef );
    this.scene = scene;

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
    this.model.reset()


    this.puckRef.position.x=this.refOffset+this.model.x
    this.puckRef.position.y = this.model.y;
    this.puckI.position.x=this.iOffset+this.model.x
    this.puckI.position.y = this.model.y;
    this.pathRefRef = new THREE.Path();
    this.pathRefRef.currentPoint = new THREE.Vector2(this.puckRef.position.x, this.puckRef.position.y)
  
    const points = [new THREE.Vector2(this.puckRef.position.x, this.puckRef.position.y)];
  
    const geometryPath = new THREE.BufferGeometry().setFromPoints( points );
    const materialPath = new THREE.LineBasicMaterial( { color: 0xff0000, transparent: true } );
    this.scene.remove( this.lineRefRef );
    this.lineRefRef = new THREE.Line( geometryPath, materialPath );
    
    this.scene.add( this.lineRefRef );

    this.pathIRef = new THREE.Path();
    this.pathIRef.currentPoint = new THREE.Vector2(this.puckI.position.x, this.puckI.position.y)
  
    const pointsI = [new THREE.Vector2(this.puckI.position.x, this.puckI.position.y)];
  
    const geometryPathI = new THREE.BufferGeometry().setFromPoints( pointsI );
    const materialPathI = new THREE.LineBasicMaterial( { color: 0xff0000, transparent: true } );
  
    this.scene.remove( this.lineIRef );

    this.lineIRef = new THREE.Line( geometryPathI, materialPathI );
    
    this.scene.add( this.lineIRef );
  }

  /**
   * Steps the view.
   * @param dt - time step, in seconds
   */
  public override step( dt: number ): void {
    if (this.model.timer<=10){
      this.disk.rotateZ(dt*2*Math.PI*this.model.omega*this.model.simSpeed);
      const bufferXRef = this.puckRef.position.x;
      const bufferYRef = this.puckRef.position.y;
      const bufferXI = this.puckI.position.x;
      const bufferYI = this.puckI.position.y;

      this.puckI.position.x = this.model.graphData.getXI(this.model.timer) + this.iOffset;
      this.puckI.position.y = this.model.graphData.getYI(this.model.timer);
      this.pathIRef.quadraticCurveTo( bufferXI, bufferYI, this.puckI.position.x, this.puckI.position.y );

      
      const pointsI = this.pathIRef.getPoints();
    
      const geometryPathI = new THREE.BufferGeometry().setFromPoints( pointsI );
      const materialPath = new THREE.LineDashedMaterial({
        color: 0xff0000,
        linewidth: 1,
        scale: .5,
        dashSize: 2,
        gapSize: 2,
        transparent: false
      });
      
      this.scene.remove(this.lineIRef);
      this.lineIRef = new THREE.Line( geometryPathI, materialPath );
      this.lineIRef.computeLineDistances();
      this.scene.add( this.lineIRef );

      this.puckRef.position.x = this.model.graphData.getX(this.model.timer) + this.refOffset;
      this.puckRef.position.y = this.model.graphData.getY(this.model.timer);
      this.pathRefRef.quadraticCurveTo( bufferXRef, bufferYRef, this.puckRef.position.x, this.puckRef.position.y );
    
      const points = this.pathRefRef.getPoints();
    
      const geometryPathRef = new THREE.BufferGeometry().setFromPoints( points );
      // const materialPath = new THREE.LineDashedMaterial({
      //   color: 0xff0000,
      //   linewidth: 1,
      //   scale: .5,
      //   dashSize: 1,
      //   gapSize: 1,
      //   transparent: false
      // });
      
      this.scene.remove(this.lineRefRef);
      this.lineRefRef = new THREE.Line( geometryPathRef, materialPath );
      this.lineRefRef.computeLineDistances();
      this.scene.add( this.lineRefRef );
    }
  }
}

coriolisForce.register( 'CoriolisForceScreenView', CoriolisForceScreenView );