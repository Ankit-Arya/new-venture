import pandas as pd
from dateutil.parser import parse

INPUT_FILE = "input_duty_summary.xlsx"
OUTPUT_FILE = "output_duty_summary_HHMM.csv"

TIME_COLUMNS = [
    "Sign_On",
    "Sign_Off",
    "Trip_Start",
    "Trip_End",
    "ACTUAL_DUTYHOURS",
    "Trip_Duration",
    "breaks",
    "Single_Run",
    "Total_Run",
]

# Read CSV
df = pd.read_csv(INPUT_FILE)

# Drop unwanted index column
df = df.loc[:, ~df.columns.str.contains("^Unnamed")]

# Convert only known time columns
for col in TIME_COLUMNS:
    if col in df.columns:
        df[col] = pd.to_datetime(df[col], errors="coerce").dt.strftime("%H:%M")

# Save cleaned file
df.to_csv(OUTPUT_FILE, index=False)

print("Saved:", OUTPUT_FILE)

