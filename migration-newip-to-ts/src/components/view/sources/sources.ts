import './sources.css';

export interface ISourceItem {
  name: string;
  id: string;
}

export class Sources {
  draw(data: ISourceItem[]): void {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

    if (!sourceItemTemp) return;
  
    data.forEach((item) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true) as Element;
  
      const sourceItemName = sourceClone.querySelector('.source__item-name');
      
      if (sourceItemName) {
        sourceItemName.textContent = item.name;
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

export default Sources;
