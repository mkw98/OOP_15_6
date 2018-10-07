'use strict';
$(function() {
    // generuje id, które sk³ada siê z ci¹gu 10 losowo wybranych znaków
	function randomString() {
          var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
          var str = '';
     for (var i = 0; i < 10; i++) {
          str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
};
	function Column(name) {
     // metoda zapobiegająca utracie kontekstu. tworzymy zmienną, która będzie trzymać prawidłowy kontekst, na który wskazuje this
    var self = this; 

    this.id = randomString();
    this.name = name;
    this.$element = createColumn();

    function createColumn() {
    	
		//stworzenie elementow kolumny. Znak $ przed nazwą zmiennej dodaje siê w celu oznaczenia, które zmienne trzymaj¹ element jQuery.
		var $column = $('<div>').addClass('column'); //Ten element bêdzie divem - dodajemy do niego klasê o takiej samej nazwie czyli column
		var $columnTitle = $('<h2>').addClass('column-title').text(self.name); //Analogicznie tworzymy tytu³ kolumny: Ustawiamy jej klasê na column-title oraz wype³niamy tekstem za pomoc¹ metody text(). Sam tekst, którym chcemy wype³niæ tytu³, znajduje siê we w³aœciwoœci name. Dostaniemy siê do niej przez zmienn¹ self. this nie zadzia³a z powodu utraty kontekstu
		var $columnCardList = $('<ul>').addClass('column-card-list'); // lista na kartki, która powinna siê znajdowaæ w œrodku kolumny. Tworzymy element listy i nadajemy mu klasê column-card-list.
		var $columnDelete = $('<button>').addClass('btn-delete').text('x'); //Zale¿y nam na mo¿liwoœci dodawania nowej karty i usuwania listy, wiêc na stronie musimy pokazaæ dwa przyciski, które wykonaj¹ te akcje.
		var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');
		
    $columnDelete.click(function() {
			self.removeColumn();
		});
		//przypisanie funkcji do przycisku:
		$columnAddCard.click(function(event) {
			self.addCard(new Card(prompt("Enter the name of the card")));
			//Ostatnim krokiem tworzenia funkcji createColumn() jest po³¹czenie wszystkich wêzłów w odpowiedniej kolejnoœci. 
			//Najpierw tytuł, potem przyciski delete i addCard, a na końcu lista kart:
			
		});
	    $column.append($columnTitle)
            .append($columnDelete)
            .append($columnAddCard)
            .append($columnCardList);
		return $column;
    }
  }

  Column.prototype = {
	  // Dodanie metody addCard()
	  //Przyjmuje jako parametr kartę, którą chcemy dodać do kolumny. 
	  //Dodajemy ją, wybierając element kolumny (stąd this.$element). 
	  //this.$element wskazuje na div.column
	  //My chcemy dodawać kolejne karty do div.column > ul, więc za pomocą jQuery pobieramy wszystkie dzieci ul kolumny. 
	  //Tak więc za pomocą this.$element.children('ul') dostaliśmy się do właściwej listy. 
	  //Teraz możemy podpiąć do niej kartę za pomocą append(card.$element).
	  //Dlaczego card.$element? Naszą kartę będziemy konstruować w sposób analogiczny do tego, w jaki konstruowaliśmy kolumnę. 
	  //Tak więc obiekt karty będzie posiadał w sobie właściwość $element, gdzie będzie trzymany węzeł DOM.
	  
	  
    addCard: function(card) {
      this.$element.children('ul').append(card.$element);
    },
	  //dodanie drugiej metody: usuwanie kolumhy
    removeColumn: function() {
      this.$element.remove();
    }
};/**/

//tworzenie funkcji konstruującej klasę Card
	
function Card(description) {
	// metoda zapobiegająca utracie kontekstu. tworzymy zmienną, która będzie trzymać prawidłowy kontekst, na który wskazuje this
	var self = this;

    this.id = randomString();
    this.description = description;
    this.$element = createCard();

    function createCard() {
      var $card = $('<li>').addClass('card');
      var $cardDescription = $('<p>').addClass('card-description').text(self.description);
      var $cardDelete = $('<button>').addClass('btn-delete').text('x');
	//odpiêcie karty
	  $cardDelete.click(function(){
        self.removeCard();
      });
	   $card.append($cardDelete)
	   .append($cardDescription);
    return $card;
 }
}

/**/Card.prototype = {
	removeCard: function() {
		this.$element.remove();
}
}/**/
var board = {
    name: 'Kanban Board',
    addColumn: function(column) {
      this.$element.append(column.$element);
      initSortable();
    },
    $element: $('#board .column-container')
};
function initSortable() {
	//wybieramy wszystkie listy kart, które mają mieć możliwość przenoszenia karty z jednego miejsca na drugie i dodajemy funkcjonalność sortowania
   $('.column-card-list').sortable({
	   //connectWith to atrybut, dzięki któremu możemy wybrać listę, w której będzie działać sortowanie
     connectWith: '.column-card-list',
	   // trzyma nazwę klasy (w tym przypadku card-placeholder), która pojawia się po najechaniu na puste pole, na które chcemy upuścić przenoszony element
     placeholder: 'card-placeholder'
   }).disableSelection();
 }
 $('.create-column')
  .click(function(){
	// Zapisanie w zmiennej prompta- nowego okna dialogowego, w którym mozna wpisac nazwę kolumny
	 var name = prompt('Enter a column name');
	// Funkcja utworzy też nową instancję, która z kolei ustawi tytuł kolumny
	 var column = new Column(name);
	//utworzenie nowej kolumny
    	board.addColumn(column);
  });

	
  // CREATING COLUMNS
var todoColumn = new Column('To do');
var doingColumn = new Column('Doing');
var doneColumn = new Column('Done');

// ADDING COLUMNS TO THE BOARD
board.addColumn(todoColumn);
board.addColumn(doingColumn);
board.addColumn(doneColumn);

// CREATING CARDS
var card1 = new Card('Inna karteczka');
var card2 = new Card('Przykladowa karteczka z zadaniem');

// ADDING CARDS TO COLUMNS
todoColumn.addCard(card1);
doingColumn.addCard(card2);

});
