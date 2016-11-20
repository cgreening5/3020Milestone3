function Node(data) {
    this.data = data; //data ie name of food
    this.elemnt = null; //html element to display in order
    this.count = 1; //qty of food
    this.next = null; //next node pointer
}


function LinkedList() {
    this.traverseNode = null;
    this.size = 0;
    this.head = null;
    this.last = null;
}

//Traverse the linked list -- use initTraverse to begin or reset the traversal
LinkedList.prototype.traverse = function () {
    var data;
    
    if (this.traverseNode !== null){
        data = this.traverseNode.data;
        this.traverseNode = this.traverseNode.next;
    }
    
    else 
        data = null;
    
    return data;
};

LinkedList.prototype.initTraverse = function () {
    this.traverseNode = this.head;
};

//adds node returns the node
LinkedList.prototype.add = function (value) {
    var node = new Node(value),
            currentNode = this.head;

    if (!currentNode) {
        this.head = node;
        this.last = node;
        this.size++;
    } else {
        this.last.next = node;
        this.last = node;
        this.size++;
    }

    return node;
};

//returns -1 if not found, otherwise returns the found node
LinkedList.prototype.search = function (data) {
    var currentNode = this.head;
    var found = false;
	var count = 0;
    while (currentNode != null && !found) {
        if (data === currentNode.data) {
            found = true;
        } 
        else {
            currentNode = currentNode.next;
        }
		count++;
    }


    if (!found) {
        return -1;
    } else {
        return currentNode;
    }
};

//returns -1 if not found, otherwise removes the node
LinkedList.prototype.remove = function (data) {
    var currentNode = this.head;
    var prevNode = null;
    var found = false;

    while (currentNode != null && !found) {
        if (data == currentNode.data) {
            found = true;
        }
        
        else
        {
            prevNode = currentNode;
            currentNode = currentNode.next;
        }
    }

    if (found) {
        if (prevNode == null) {
            this.head = this.head.next;
        } 
		else {
			if(this.last == currentNode) {
				this.last = prevNode;
				this.last.next = null;
			}
            else 
				prevNode.next = currentNode.next;
        }

        this.size--;
        return currentNode;
    }
    
    return -1;
};

LinkedList.prototype.isEmpty = function () {
    return this.head == null;
};

LinkedList.prototype.clear = function(){
    this.head = null;
	this.last = null;
	this.size = 0;
}

LinkedList.prototype.increment = function (node) {
    if (node != null)
        node.count++;
};

LinkedList.prototype.setCount = function (node, newCount) {
    if (node != null)
        node.count = newCount;
};

LinkedList.prototype.decrement = function (node) {
    if (node != null)
        node.count--;
};

LinkedList.prototype.getElement = function (node) {
    return this.elemnt;
};

LinkedList.prototype.setElement = function (node, value) {
    this.elemnt = value;
};