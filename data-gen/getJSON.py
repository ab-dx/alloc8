import json
import yaml

batches: tuple[str] = "btech22", "btech23", "btech24", "phd19", "phd20" # Define batches here
genders = "male", "female"
blocks = "A", "B", "C", "D" # Define blocks here
hostels = "Aryabhatta", "Kalam", "Asima" # Define hostels here
batches_to_genders = {}
with open("hostel_choice.yaml") as fin:
    try:
        data = yaml.safe_load(fin)

    except yaml.YAMLError as error:
        print(error)
        exit()
    for batch in data:
        if batch not in batches:
            print(f"Invalid batch {batch}")
            exit()
        batches_to_genders[batch] = []
        for gender in data[batch]:
            if gender not in genders or data[batch][gender]["capacity"] < 1:
                print(f"Invalid gender {gender} or capacity {data[batch][gender]['capacity']}")
                exit()
            batches_to_genders[batch].append(gender)
            for hostel in data[batch][gender]["hostels"]:
                if hostel not in hostels:
                    print(f"Invalid hostel {hostel}")
                    exit()
                for block in data[batch][gender]["hostels"][hostel]:
                    numRooms = 0
                    if block not in blocks:
                        print(f"Invalid block {block}")
                        exit()
                    for roomRange in data[batch][gender]["hostels"][hostel][block]:
                        roomRange = roomRange.split("-")
                        if (roomRange[0][0] != roomRange[1][0]):
                            print(f"Invalid room range {roomRange[0]}-{roomRange[1]}")
                            exit()
                        numRooms += int(roomRange[1][1:])-int(roomRange[0][1:])+1
                    print(batch, gender, hostel, block, numRooms)
    with open("available_rooms.json", "w") as fout:
        json.dump(data, fout)
    with open("batches_to_genders.json", "w") as fout:
        json.dump(batches_to_genders, fout)
