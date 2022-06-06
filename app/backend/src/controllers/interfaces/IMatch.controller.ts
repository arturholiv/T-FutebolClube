import { Request, Response } from 'express';

export default interface IMatchController {
  getAll(req: Request, res: Response): Promise<Response>;
  create(req: Request, res: Response): Promise<Response>;
  updateProgress(req: Request, res: Response): Promise<Response>;
  update(req: Request, res: Response): Promise<Response>;
}
