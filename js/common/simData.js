export class simData {
    constructor(interval) {
        this.data = [];
        this.interval = interval;
        this.id = Math.random();
    }


    insert(time, x, y, v_x, v_y, xI, yI, distance, tv) {
        // console.log(time,x,y,v_x,v_y)
        this.data.push(new dataPoint(time, x, y, v_x, v_y, xI, yI, distance, tv));
    }
    getX(time) {
        let dataIndex = (time / this.interval).toFixed(0);
        //console.log(dataIndex)

        if (dataIndex > this.data.length - 1) {
            dataIndex = this.data.length - 1;
            // return 0;
        }

        return this.data[dataIndex].x;
    }
    getY(time) {
        let dataIndex = (time / this.interval).toFixed(0);
        //console.log(dataIndex)

        if (dataIndex > this.data.length - 1) {
            dataIndex = this.data.length - 1;
            // return 0;
        }

        return this.data[dataIndex].y;
    }
    getDistance(time) {
        let dataIndex = (time / this.interval).toFixed(0);

        if (dataIndex > this.data.length - 1) {
            dataIndex = this.data.length - 1;
            // return 0;
        }
        // console.log(Math.sqrt(Math.pow(this.data[dataIndex].y, 2) + Math.pow(this.data[dataIndex].x, 2)))
        return Math.sqrt(Math.pow(this.data[dataIndex].y, 2) + Math.pow(this.data[dataIndex].x, 2));
    }
    getTV(time){
        let dataIndex = (time / this.interval).toFixed(0);

        if (dataIndex > this.data.length - 1) {
            dataIndex = this.data.length - 1;
            // return 0;
        }
        // console.log(Math.sqrt(Math.pow(this.data[dataIndex].y, 2) + Math.pow(this.data[dataIndex].x, 2)))
        return this.data[dataIndex].omega * 200
    }
    getXI(time) {
        let dataIndex = (time / this.interval).toFixed(0);
        //console.log(dataIndex)

        if (dataIndex > this.data.length - 1) {
            dataIndex = this.data.length - 1;
            // return 0;
        }

        return this.data[dataIndex].xI;
    }
    getYI(time) {
        let dataIndex = (time / this.interval).toFixed(0);
        //console.log(dataIndex)

        if (dataIndex > this.data.length - 1) {
            dataIndex = this.data.length - 1;
            // return 0;
        }

        return this.data[dataIndex].yI;
    }
    getV_X(time) {
        let dataIndex = (time / this.interval).toFixed(0);
        //console.log(dataIndex)

        if (dataIndex > this.data.length - 1) {
            // dataIndex = this.data.length-1;
            return 0;
        }

        return this.data[dataIndex].v_x;
    }

    getV_Y(time) {
        let dataIndex = (time / this.interval).toFixed(0);
        if (dataIndex > this.data.length - 1) {
            // dataIndex = this.data.length-1;
            return 0;
        }
        return this.data[dataIndex].v_y;
    }


}

class dataPoint {
    constructor(time, x, y, v_x, v_y, xI, yI, distance, tv) {
        this.time = time;
        this.x = x;
        this.y = y;
        this.v_x = v_x;
        this.v_y = v_y;
        this.xI = xI;
        this.yI = yI;
        this.distance = distance;
        this.tv = tv;

    }
}
