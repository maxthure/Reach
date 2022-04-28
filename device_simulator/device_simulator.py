import requests

example_data = [
    "example01.json",
    "example02.json",
    "example03.json",
    "example04.json",
    "example05.json",
    "example06.json",
    "example07.json",
    "example08.json",
    "example09.json"
]

url = "localhost:8080/new-measurement"

def main():
    input("Press Enter")

    print(de_and_enqueue())
    main()

def de_and_enqueue():
    m = example_data.pop(0)
    example_data.append(m)

    return m

if __name__ == "__main__":
    main()