class Calc {
  static #value = ''

  static add = (newValue) => {
      console.log(this.#value)

      this.#value = this.#value.concat(newValue)
      this.#output()
    }

  static #output = () => {
    // this.#save()
    window.output.innerHTML = this.#value
  }

  static dot = () => {
    this.#value = this.#value.concat('.')
    this.#output()

    }

  //   if (isNaN(this.#value[this.#value.length - 1])) {
  //     return null
  //   }

  //   
  //   
  //   this.#isDot = true
  // }

  // static op = (opValue) => {
  //   if (isNaN(this.#value[this.#value.length - 1])) {
  //     return null
  //   }

  //   this.#value = this.#value.concat(opValue)
  //   this.#output()
  //   this.#isDot = false
  // }

  // static reset = () => {
  //   this.#value = ''
  //   this.#isDot = false
  //   this.#output()
  // }

  // static result = () => {
  //   this.#value = String(eval(this.#value))
  //   this.#output()
  // }

  // static #save = () => {
  //   window.localStorage.setItem(this.#NAME, this.#value)
  // }

  // static #load = () => {
  //   this.#value =
  //     window.localStorage.getItem(this.#NAME) || 0
  // }

  // static init = () => {
  //   this.#load()
  //   this.#output()
  //   console.log('Calc is init')
  // }
}
window.calc = Calc
