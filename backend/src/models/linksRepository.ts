import linkModel, {ILinkModel} from './linkModel';
import {Link} from './link';

function findByVCode(code: string){
    return linkModel.findOne<ILinkModel>({ where: { code } });
}

function add(link: Link){
    return linkModel.create<ILinkModel>(link);
}

async function hit(code: string){
    const link = await findByVCode(code);
    if(!link) return null;

    link.hits!++;
    await link.save();
    return link;
}

export default {
    findByVCode,
    add,
    hit
}