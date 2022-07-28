import express from 'express';
import { IController } from '../../shared/interfaces'

interface V1 {
    _c: IController[];
    path: string;
    router: express.Router;
}

export default class APIV1 implements V1 {
	path = "/v1";
	router = express.Router();

	// Arrays of controllers
	_c = [];

	constructor() {

		// Initiate all controllers
		this.initController(this._c);
	}

	/**
	 * 
	 * @param _c Controllers that implements IController interface
	 */
	private initController = (_c: IController[]) => {
		_c.forEach((controller) => {
			this.router.use(this.path, controller.router);
		});
	};
}