import './sources.css';
import { Source } from '../../model/newsData';
import { IVew } from '../appView';

export class Sources implements IVew<Source> {
    public draw(data: Source[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = <HTMLTemplateElement>document.querySelector('#sourceItemTemp');

        data.forEach((item) => {
            const sourceClone = <DocumentFragment>sourceItemTemp.content.cloneNode(true);

            const itemName = sourceClone.querySelector('.source__item-name');
            if (itemName) {
                itemName.textContent = item.name;
            }

            const sourceItem = sourceClone.querySelector('.source__item');
            if (sourceItem) {
                sourceItem.setAttribute('data-source-id', item.id);
            }

            fragment.append(sourceClone);
        });

        const sourcesElement = document.querySelector('.sources');
        if (sourcesElement) {
            sourcesElement.append(fragment);
        }
    }
}
