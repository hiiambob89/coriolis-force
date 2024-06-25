// function derivsEval(drag, y, dydt, equations) {
//     try {
//         dydt[0] = equations.xdot({x: y[0], y: y[1], v_x: y[2], v_y: y[3]});
//     } catch (err) {
//         console.log(err);
//     }

//     try {
//         dydt[1] = equations.ydot({x: y[0], y: y[1], v_x: y[2], v_y: y[3]});
//     } catch (err) {
//         console.log(err);
//     }

//     try {
//         dydt[2] = equations.v_xdot({x: y[0], y: y[1], v_x: y[2], v_y: y[3]});
//     } catch (err) {
//         console.log(err);
//     }

//     try {
//         dydt[3] = equations.v_ydot({x: y[0], y: y[1], v_x: y[2], v_y: y[3]});
//     } catch (err) {
//         console.log(err);
//     }

//     return dydt;
// }

// function derivs(drag, y, dydt, g, k, m, omega) {
//     let coriolis_x = 2 * m * y[3] * omega; 
//     let coriolis_y = -2 * m * y[2] * omega; 

//     if (drag) {
//         dydt[0] = y[2]; 
//         dydt[1] = y[3]; 
//         dydt[2] = -(k / m) * y[2] * Math.sqrt(y[2] ** 2 + y[3] ** 2) + coriolis_x / m; 
//         dydt[3] = -g - (k / m) * y[3] * Math.sqrt(y[2] ** 2 + y[3] ** 2) + coriolis_y / m; 
//     } else {
//         dydt[0] = y[2]; 
//         dydt[1] = y[3]; 
//         dydt[2] = -(k / m) * y[2] + coriolis_x / m; 
//         dydt[3] = -g - (k / m) * y[3] + coriolis_y / m; 
//     }

//     return dydt;
// }

// function rk4(drag,y, N, x, h, ynew, g, k, m, equations, useEval) {
//     let h6 = h / 6.0;
//     let hh = h * 0.5;
//     let dydx = [];
//     let yt = [];
//     let dyt = [];
//     let dym = [];

//     dydx = useEval ? derivsEval(drag,y, dydx, equations) : derivs(drag,y, dydx, g, k, m);

//     for (let index = 0; index < N; index++) {
//         yt[index] = y[index] + hh * dydx[index];
//     }

//     dyt = useEval ? derivsEval(drag,yt, dyt, equations) : derivs(drag,yt, dyt, g, k, m);
//     for (let index = 0; index < N; index++) {
//         yt[index] = y[index] + hh * dyt[index];
//     }

//     dym = useEval ? derivsEval(drag,yt, dym, equations) : derivs(drag,yt, dym, g, k, m);
//     for (let index = 0; index < N; index++) {
//         yt[index] = y[index] + h * dym[index];
//         dym[index] += dyt[index];
//     }

//     dyt = useEval ? derivsEval(drag,yt, dyt, equations) : derivs(drag,yt, dyt, g, k, m);

//     // for (let index = 0; index < N; index++) {
//     //     ynew[index] = y[index] + h6 * (dydx[index] + dyt[index] + 2.0 * dym[index]);
//     // }
//     console.log("Before updating ynew:");
//     console.log("y:", y);
//     console.log("dydx:", dydx);
//     console.log("dyt:", dyt);
//     console.log("dym:", dym);
//     console.log("h6:", h6);

//     for (let index = 0; index < N; index++) {
//         ynew[index] = y[index] + h6 * (dydx[index] + dyt[index] + 2.0 * dym[index]);
//     }

//     console.log("After updating ynew:", ynew);

//     // console.log("From rk4:")
//     // console.log(dydx)

//     return ynew;
// }



// export function getGraphData(drag,dt,xinit,yinit,xdot,ydot ,g, k, m, equations, useEval, graphLen, graphVals, time){

//     const N = 6;
//     let h = dt; 
//     let t = time;

//     let y = [xinit,yinit,xdot, ydot];  
//     let ynew = [...y];

//     console.log(drag,dt,xinit,yinit,xdot,ydot ,g, k, m, equations, useEval, graphLen, graphVals, time)
//     while(t<.01){  
//         graphVals.insert(t,ynew[0],ynew[1],ynew[2],ynew[3]);
//         ynew = rk4(drag,y,N,t,h,ynew,g, k, m, equations, useEval);
//         // console.log("ynew:", ynew);

//         y = [...ynew];

//         t = t + h;


//     }
//     return graphVals;

// }
function derivsEval(drag, y, dydt, equations) {
    try {
        dydt[0] = equations.xdot({ x: y[0], y: y[1], v_x: y[2], v_y: y[3] });
    } catch (err) {
        console.log("Error in xdot:", err);
    }

    try {
        dydt[1] = equations.ydot({ x: y[0], y: y[1], v_x: y[2], v_y: y[3] });
    } catch (err) {
        console.log("Error in ydot:", err);
    }

    try {
        dydt[2] = equations.v_xdot({ x: y[0], y: y[1], v_x: y[2], v_y: y[3] });
    } catch (err) {
        console.log("Error in v_xdot:", err);
    }

    try {
        dydt[3] = equations.v_ydot({ x: y[0], y: y[1], v_x: y[2], v_y: y[3] });
    } catch (err) {
        console.log("Error in v_ydot:", err);
    }

    return dydt;
}


function derivs(drag, y, dydt, g,k, m) {
    let speed = Math.sqrt(y[2] ** 2 + y[3] ** 2);

    if (drag) {
        dydt[0] = y[2]; 
        dydt[1] = y[3]; 
        dydt[2] = -((k / m) * y[2] * speed);
        dydt[3] = -((k / m) * y[3] * speed);
    } else {
        dydt[0] = y[2];
        dydt[1] = y[3];
        dydt[2] = -(k / m) * y[2];
        dydt[3] = -(k / m) * y[3];
    }

    return dydt;
}



// function derivs(y, dydt, m, omega, t) {
//     // Initial conditions (after throw, the ball moves under inertia)
//     dydt[0] = y[2]; // dx/dt = vx
//     dydt[1] = y[3]; // dy/dt = vy
//     dydt[2] = 0; // dvx/dt = 0 (no forces after throw)
//     dydt[3] = 0; // dvy/dt = 0 (no forces after throw)

//     return dydt;
// }

function rk4(drag, y, N, x, h, ynew, g, k, m, omega, equations, useEval) {
    let h6 = h / 6.0;
    let hh = h * 0.5;
    let dydx = new Array(y.length).fill(0);
    let yt = new Array(y.length).fill(0);
    let dyt = new Array(y.length).fill(0);
    let dym = new Array(y.length).fill(0);

    dydx = derivs(drag, y, dydx, g, k, m, omega);

    for (let index = 0; index < N; index++) {
        yt[index] = y[index] + hh * dydx[index];
    }

    dyt = derivs(drag, yt, dyt, g, k, m, omega);
    for (let index = 0; index < N; index++) {
        yt[index] = y[index] + hh * dyt[index];
    }

    dym = derivs(drag, yt, dym, g, k, m, omega);
    for (let index = 0; index < N; index++) {
        yt[index] = y[index] + h * dym[index];
        dym[index] += dyt[index];
    }

    dyt = derivs(drag, yt, dyt, g, k, m, omega);

    // console.log("Before updating ynew:");
    // console.log("y:", y);
    // console.log("dydx:", dydx);
    // console.log("dyt:", dyt);
    // console.log("dym:", dym);
    // console.log("h6:", h6);

    for (let index = 0; index < N; index++) {
        ynew[index] = y[index] + h6 * (dydx[index] + dyt[index] + 2.0 * dym[index]);
    }

    // console.log("After updating ynew:", ynew);

    return ynew;
}

function transformToInertial(x_r, y_r, theta) {
    let x_i = x_r * Math.cos(theta) - y_r * Math.sin(theta);
    let y_i = x_r * Math.sin(theta) + y_r * Math.cos(theta);
    return [x_i, y_i];
}

function findDistance(x, y){
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
}

function tv(omega){
    return omega * 200
}

export function getGraphData(drag, dt, xinit, yinit, xdot, ydot, g, k, m, omega, equations, useEval, graphLen, graphVals, time) {
    const N = 4;
    let h = dt;
    let t = time;
    let xx = xinit;
    let yy = yinit;
    let y = [xx, yy, xdot, ydot];
    let ynew = [...y];

    console.log(drag, dt, xinit, yinit, xdot, ydot, g, k, m, omega, equations, useEval, graphLen, graphVals, time);
    while (t < 10) {
        let theta = omega * t * 2 * Math.PI;
        let [xInertial, yInertial] = transformToInertial(ynew[0], ynew[1], theta)
        graphVals.insert(t, xInertial, yInertial, ynew[2], ynew[3], ynew[0], ynew[1], findDistance(xInertial, yInertial), tv(omega));
        ynew = rk4(drag, y, N, t, h, ynew, g, k, m, omega, equations, useEval);
        y = [...ynew];
        // console.log(findDistance(xInertial, yInertial))
        t = t + h;
    }
    return graphVals;
}