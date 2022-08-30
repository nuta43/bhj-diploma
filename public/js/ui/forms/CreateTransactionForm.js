/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList()
    this.element=element
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const list = this.element.querySelector('select.accounts-select');
    list.innerHTML = '';
    const data = User.current();  
    Account.list(data, (err, response) => { 
      if (response.success) {
        response.data.forEach(el => list.insertAdjacentHTML('beforeend', 
        `<option value="${el.id}">${el.name}</option>`))
      }
    });
  }
  

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response.success) {
        let name;
        switch (data.type) {
          case 'expense':
            name = 'newExpense';
          break;
          case 'income':
            name = 'newIncome';
          break;
        }
        document.forms[`new-${data.type}-form`].reset();
        App.getModal(name).close();
        App.update();
      }
    });
  }
}